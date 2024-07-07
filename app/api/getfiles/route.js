import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/drive/v3/files?q=" +
        process.env.FILE_ID +
        "+in+parents&key=" +
        process.env.API_KEY,
      { cache: "no-store" }
    );
    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "ERROR OCCURED GETFILES." });
  }
}
