import redisClient from "@/config/redis.js";
import mailer from "../email/mailer.js";
import createHttpError from "http-errors";

import userService from "../user/user.service.js";

import jwtStore from "@/utils/jwtStore.js";

import { v4 as uuidv4 } from "uuid";

class AuthService {
  async register(payload: AuthRegisterDTO) {
    const { email } = await userService.create(payload);

    let otp = "123456";
    if (process.env.NODE_ENV == "production") {
      otp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    await redisClient.set(`auth:otp:${email}`, otp, "EX", 600);
    await mailer.sendMail({
      data: { email: email, otp: otp },
      subject: "OTP Verification",
      template: "otp",
      to: email,
    });
  }

  async verifyOtp(payload: AuthVerifyOtpDTO) {
    const { email, otp } = payload;
    const storedOtp = await redisClient.get(`auth:otp:${email}`);
    if (!storedOtp) {
      throw createHttpError(410, "OTP Expired or invalid");
    }

    if (otp != Number(storedOtp)) {
      throw createHttpError(400, "Incorrect OTP");
    }

    await redisClient.del(`auth:otp:${email}`);

    await userService.markedAsVerified(email);
  }

  async login(email: string, password: string) {
    const user = await userService.findUserByCred(email, password);

    const accessJTI = uuidv4();
    const accessToken = jwtStore.generateAccessToken({
      sub: user.public_id.toString(),
      jti: accessJTI,
    });
    await redisClient.set(
      `auth:session:access:${accessJTI}`,
      user.public_id,
      "PX",
      Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    );

    const refreshJTI = uuidv4();
    const refreshToken = jwtStore.generateRefreshToken({
      sub: user.public_id.toString(),
      jti: refreshJTI,
    });
    await redisClient.set(
      `auth:session:refresh:${refreshJTI}`,
      user.public_id,
      "PX",
      Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
    );

    return { accessToken, refreshToken };
  }
}

export default new AuthService();
