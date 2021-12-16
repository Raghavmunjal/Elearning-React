import mongoose from "mongoose";

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      // to accept all type
      type: {},
      minLength: 20,
    },
    video_link: {},
    free_preview: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 320,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      // to accept all type
      type: {},
      minLength: 20,
      required: true,
    },
    price: {
      type: Number,
      default: 3499,
    },
    image: {},
    category: {
      type: String,
      default: "development",
      enum: [
        "development",
        "health",
        "business",
        "music",
        "marketing",
        "design",
      ],
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
