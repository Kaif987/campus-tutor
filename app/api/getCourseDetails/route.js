import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { id } = await req.json();
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${FILE_ID}+in+parents&key=${process.env.API_KEY}`,
      { cache: "no-store" }
    );
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
