import pool from "@/config/db.js";
import { v7 as uuid7 } from "uuid";
import b from "bcrypt";
import createHttpError from "http-errors";

class UserService {
  async create(payload: UserCreateDTO) {
    const { email, password } = payload;
    const public_id = uuid7();
    const username = Date.now().toString();
    const hashedPassword = await b.hash(password, 8);

    try {
      await pool.query(
        `INSERT INTO users (
            public_id,
            username,
            email,
            password
          ) VALUES (UUID_TO_BIN(?), ?, ?, ?)`,
        [public_id, username, email, hashedPassword],
      );

      return { email };
    } catch (error: any) {
      if (error.code == "ER_DUP_ENTRY") {
        const [[user]] = await pool.query<IFindUserQuery[]>(
          `SELECT is_verified FROM users WHERE email = ? LIMIT 1`,
          [email],
        );

        if (!user?.is_verified) {
          await pool.query(`UPDATE users SET password = ? WHERE email = ?`, [
            hashedPassword,
            email,
          ]);

          return { email };
        } else {
          throw createHttpError(409, "Email is already in use");
        }
      }
      throw error;
    }
  }

  async markedAsVerified(email: string) {
    const query = `
      UPDATE users
      SET is_verified = TRUE
      Where email = ? 
    `;

    await pool.query(query, [email]);
  }

  async findUserByCred(email: string, password: string) {
    const query = `
      SELECT 
      BIN_TO_UUID(public_id) as public_id, email, password, username, is_verified 
      FROM users 
      WHERE email = ? 
      LIMIT 1
    `;

    const [[user]] = await pool.query<IFindUserQuery[]>(query, [email]);

    if (!user?.is_verified) {
      throw createHttpError(401, "Invalid Credentials");
    }

    const isTrue = await b.compare(password, user.password!);

    if (!isTrue) {
      throw createHttpError(401, "Invalid Credentials");
    }

    delete user.password;
    delete user.is_verified;
    return user;
  }

  async findUserById(public_id: string) {
    const [[user]] = await pool.query<IFindUserQuery[]>(
      `
      SELECT BIN_TO_UUID(public_id) as public_id, username, email, created_at, updated_at
      FROM users WHERE public_id = UUID_TO_BIN(?);
      `,
      [public_id],
    );
    if (!user) throw createHttpError(404, "User not found");
    return user;
  }
}

export default new UserService();
