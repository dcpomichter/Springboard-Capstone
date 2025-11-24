import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const { token, password } = reqBody;
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save()

        const response = await NextResponse.json({
            message: "Password Reset Successfully",
            success: true
        })

        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        revalidatePath('/')
        return response
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
