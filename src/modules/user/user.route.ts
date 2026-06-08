import express from "express";
import userController from "./user.controller.js";
import auth from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.use(auth);
router.get("/me", userController.me);

export default router;
