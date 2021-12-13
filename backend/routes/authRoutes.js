import express from "express";
import { resetEmail, checkEmail } from "../controllers/authControllers.js";
const router = express.Router();

router.route("/forget-password").post(resetEmail);
router.route("/verify-email").post(checkEmail);

export default router;
