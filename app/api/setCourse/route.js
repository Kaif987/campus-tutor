import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getAllVideos } from "@/app/(user)/[id]/components/demodata";

export async function POST(req) {
  try {
    const { email, CourseName, checkORadd, id } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email });
    const isEnrolled = await user.courses.some(
      (course) => course.courseName === CourseName
    );

    if (!isEnrolled) {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=" +
        process.env.FILE_ID +
        "+in+parents&key=" +
        process.env.API_KEY,
        { cache: "no-store" }
      );

      const data = await response.json();
      const Course = data.files[id.substring(1)]
      const videos = await getAllVideos(Course)
      console.log({ videos })

      if (checkORadd === "check") {
        return NextResponse.json({ message: "Not Enrolled" }, { status: 200 });
      } else {
        const course = await user.courses.push({
          courseId: id,
          courseName: CourseName,
          videos: videos,
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
