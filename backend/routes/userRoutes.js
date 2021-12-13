import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  sendOtp,
  currentInstructor,
} from "../controllers/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/isvalid").get(protect, currentUser);
router.route("/isInstructor").get(protect, currentInstructor);
router.route("/send-otp").post(sendOtp);

export default router;
