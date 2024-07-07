import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {
    const { userId, courseId, videoId } = await req.json();

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const course = user.courses.find(course => course.courseId === courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const video = course.videos.find(video => video.videoId === videoId);
        if (!video) {
            throw new Error("Video not found");
        }

        return NextResponse.json({ watched: video.watched }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}