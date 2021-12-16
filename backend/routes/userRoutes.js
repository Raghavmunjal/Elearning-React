import express from "express";
import { protect, isInstructor } from "../middleware/authMiddleware";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  sendOtp,
} from "../controllers/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/isvalid").get(protect, currentUser);
router.route("/isInstructor").get(protect, isInstructor, currentUser);
router.route("/send-otp").post(sendOtp);

export default router;
