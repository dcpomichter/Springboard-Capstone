import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";
import Game from "@/models/gameModel";
import Review from "@/models/reviewModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findById(userId).select("-password")
        const updatedLibrary = []
        const updatedReviews = []
        for (let game of user.library) {
            const gameDetails = await Game.findById(game)
            updatedLibrary.push(gameDetails)
        }
        for (let review of user.reviews) {
            const reviewDetails = await Review.findById(review)
            updatedReviews.push(reviewDetails)
        }
        return NextResponse.json({
            message: "User Found",
            user: {
                ...user,
                library: updatedLibrary,
                reviews: updatedReviews
            }
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
