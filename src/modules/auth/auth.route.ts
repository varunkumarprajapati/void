import express from "express";
import authController from "./auth.controller.js";
import { validate } from "@/middlewares/validate.js";
import { loginSchema, registerSchema, verifyOtpSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);
router.post("/login", validate(loginSchema), authController.login);

export default router;
