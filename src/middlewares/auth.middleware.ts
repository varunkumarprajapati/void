import redisClient from "@/config/redis.js";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies?.void_access_token;

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

  const sessionKey = `auth:session:access:${decoded?.jti}`;
  const isValidSession = await redisClient.get(sessionKey);

  if (!isValidSession) throw createHttpError(401, "Unauthorized");

  req.user = {
    sub: decoded.sub,
  };

  next();
}
export default auth;
