import { connect } from "@/dbConfig/dbConfig";
import Game from "@/models/gameModel";
import User from "@/models/userModel";
import Review from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { reviewId } = reqBody
        let review = await Review.findById(reviewId)

        if (!review) {
            return NextResponse.json({ error: "Review does not exist" }, { status: 400 })
        }

        const user = await User.findById(review.reviewer)
        const game = await Game.findById(review.game)

        review._doc.reviewer = user
        review._doc.game = game

        return NextResponse.json({
            message: "Review Found",
            review: review._doc
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
