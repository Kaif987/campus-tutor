import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findOne({ email });
    const userCourses = await user.courses;
    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" + error }, { status: 500 });
  }
}
