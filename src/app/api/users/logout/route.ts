import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await NextResponse.json({
            message: "Logout Successful",
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
