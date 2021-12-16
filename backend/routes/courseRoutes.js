import express from "express";
import { protect, isInstructor } from "../middleware/authMiddleware";
import {
  uploadImage,
  removeImage,
  createCourse,
  getInstructorCourses,
  getCourseDetails,
} from "../controllers/courseController";
const router = express.Router();

// images
router.route("/upload-image").post(protect, isInstructor, uploadImage);
router.route("/remove-image").post(protect, isInstructor, removeImage);

// courses
router
  .route("/instructor-courses")
  .get(protect, isInstructor, getInstructorCourses);
router.route("/:slug").get(protect, isInstructor, getCourseDetails);
router.route("/").post(protect, isInstructor, createCourse);

export default router;
