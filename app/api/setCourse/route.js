import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, CourseName, checkORadd, id } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email });
    const isEnrolled = await user.courses.some(
      (course) => course.courseName === CourseName
    );

    if (!isEnrolled) {
      if (checkORadd === "check") {
        return NextResponse.json({ message: "Not Enrolled" }, { status: 200 });
      } else {
        const course = await user.courses.push({
          courseId: id,
          courseName: CourseName,
          progress: 0,
        });

        await user.save();
        return NextResponse.json({ message: "Course added" }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Already Enrolled" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" + error }, { status: 200 });
  }
}
