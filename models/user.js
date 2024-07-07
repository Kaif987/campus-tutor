import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        courseId: {
          type: String,
        },
        courseName: {
          type: String,
          required: true,
        },
        videos: [
          {
            videoId: {
              type: String,
              required: true,
            },
            watched: {
              type: Boolean,
              default: false,
            },
          },
        ],
        progress: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
