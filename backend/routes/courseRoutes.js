import express from "express";
import { uploadImage, removeImage } from "../controllers/courseController";
const router = express.Router();

router.route("/upload-image").post(uploadImage);
router.route("/remove-image").post(removeImage);
export default router;
