import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  makeInstructor,
  getAccountStatus,
} from "../controllers/roleControllers";

const router = express.Router();

router.route("/make-instructor").post(protect, makeInstructor);
router.route("/get-account-status").post(protect, getAccountStatus);

export default router;
