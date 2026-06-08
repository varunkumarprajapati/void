import type { Request, Response } from "express";
import userService from "./user.service.js";

class UserController {
  async me(req: Request, res: Response) {
    const user = await userService.findUserById(req.user.sub);
    return res.json({ data: user, message: "User fetched Successfully" });
  }
}
export default new UserController();
