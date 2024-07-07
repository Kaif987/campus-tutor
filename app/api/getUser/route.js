import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {

    try {
        const { id } = await req.json();
        console.log(id)
        await connectMongoDB();
        const user = await User.findOne({
            _id: id
        });


        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "There was an error trying to get the user" + error },
            { status: 500 }
        );
    }
}

