import type { Request, Response } from "express";
import userService from "./user.service.js";
import createHttpError from "http-errors";

class UserController {
  async me(req: Request, res: Response) {
    if (!req.user?.sub) throw createHttpError(404, "No user id provided");
    const user = await userService.findUserById(req.user?.sub);
    return res.json({ data: user, message: "User fetched Successfully" });
  }
}
export default new UserController();
