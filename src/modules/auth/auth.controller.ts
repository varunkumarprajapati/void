import type { Request, Response } from "express";
import authService from "../auth/auth.service.js";

class AuthController {
  private isProd = process.env.NODE_ENV === "production";
  constructor() {
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    await authService.register(req.body);
    return res.status(201).json({ message: "User created successfully" });
  }

  async verifyOtp(req: Request, res: Response) {
    await authService.verifyOtp(req.body);
    return res.json({
      message: "User verified successfully",
    });
  }

  async login(req: Request, res: Response) {
    const { accessToken, refreshToken } = await authService.login(
      req.body.email,
      req.body.password,
    );

    res.cookie("void_access_token", accessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
      secure: this.isProd,
      sameSite: this.isProd ? "strict" : "lax",
      path: "/",
      httpOnly: true,
    });

    res.cookie("void_refresh_token", refreshToken, {
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
      secure: this.isProd,
      sameSite: this.isProd ? "strict" : "lax",
      path: "/",
      httpOnly: true,
    });

    return res.json({ message: "User authenticated successfully" });
  }
}

export default new AuthController();
