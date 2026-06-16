import type { RowDataPacket } from "mysql2";

declare global {
  interface IUser {
    id: number;
    email: string;
    password: string;
    username: string;
    is_verified: boolean;
    public_id: string;
    created_at: string;
    updated_at: string;
  }

  interface UserCreateDTO extends Pick<IUser, "email" | "password"> {}
  interface IFindUserQuery
    extends
      Pick<
        IUser,
        "public_id" | "email" | "password" | "username" | "is_verified"
      >,
      RowDataPacket {
    password?: string;
    is_verified?: string;
  }
}

export {};
