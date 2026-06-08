import jwt from "jsonwebtoken";

class JWTStore {
  generateAccessToken({ sub, jti }: { sub: string; jti: string }) {
    return jwt.sign({ sub, jti }, process.env.JWT_SECRET_KEY, {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    });
  }
  generateRefreshToken({ sub, jti }: { sub: string; jti: string }) {
    return jwt.sign({ sub, jti }, process.env.JWT_SECRET_KEY, {
      expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
    });
  }
}
export default new JWTStore();
