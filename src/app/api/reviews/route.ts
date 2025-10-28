import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/reviewModel"
import { connect } from "@/dbConfig/dbConfig";
import toast from "react-hot-toast";

connect();

export async function GET(request: NextRequest) {
    try {
        const reviews = await Review.find()
        return NextResponse.json({
            message: "Reviews Found",
            reviews
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
