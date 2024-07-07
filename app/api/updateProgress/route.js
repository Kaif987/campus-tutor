import { updateProgress } from "@/lib/updateProgress"; // Adjust the path as necessary
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId, courseId, videoId, status } = await req.json();

    try {
        const progress = await updateProgress(userId, courseId, videoId, status);
        return NextResponse.json({ progress }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

}