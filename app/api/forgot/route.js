import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "t6643623@gmail.com",
        pass: "bvdo odds xbei vnpx "
    }
})


const sendResetEmail = async (token, id, email, name) => {
    const url = new URL(`${process.env.NEXTAUTH_URL}/reset-password`)
    url.searchParams.append("id", id)
    url.searchParams.append("token", token)
    console.log(url.toString())

    let mailDetails = {
        from: "t6643623@gmail.com",
        to: email,
        subject: "Reset Your ---- Password",
        text: `Forgot password Click on this link to reset your password: ${url.toString()}`
    }

    mailTransporter.sendMail(mailDetails, (err, data) => {
        if (err) {
            console.log(err)
            console.log("Error occured")
        } else {
            console.log("Email sent successfully")
        }
    })
}

const createToken = (user, id) => {
    const { email, password } = user
    console.log({ email, id })
    return jwt.sign({ email, id }, process.env.JWT_SECRET + password, { expiresIn: "15m" })
}

export async function POST(req) {
    try {
        const { email } = await req.json()
        console.log({ email })
        await connectMongoDB()
        const user = await User.findOne({ email })
        if (!user) throw Error("User not registered")
        const { _id: id, name } = user
        const token = createToken(user, id)
        await sendResetEmail(token, id, email, name)
        return NextResponse.json({ message: "Email sent" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}