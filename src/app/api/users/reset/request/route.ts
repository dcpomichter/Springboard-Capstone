import { sendEmail } from "@/helpers/mailer"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const { email } = reqBody

    //verify if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id })

    return NextResponse.json({
        message: "Email sent successfully",
        success: true
    })
}
