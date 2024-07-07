import mongoose, { Schema, models } from "mongoose";

const UserCourseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      id: {
        type: String,
        required: true,
      },
      progress: {
        type: String,
        default: "",
      },
    },
  ],
});
const UserCourse =
  models.UserCourse || mongoose.model("UserCourse", UserCourseSchema);
export default UserCourse;
