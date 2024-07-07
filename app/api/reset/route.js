import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
const jwt = require("jsonwebtoken")

export async function POST(req) {

    try {
        const { id, token, password } = await req.json();
        await connectMongoDB();
        const user = await User.findOne({ _id: id })
        // check if id is matching
        if (!user) throw new Error("Invalid ID")

        // check if token is valid or not
        jwt.verify(token, process.env.JWT_SECRET + user.password, function (err, decoded) {
            if (err) throw new Error("Invalid Token")
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate({
            _id: id
        }, { password: hashedPassword });
        console.log(user)
        return NextResponse.json({ message: "User password has been updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "There was an error trying to get the user " + error },
            { status: 500 }
        );
    }
}



