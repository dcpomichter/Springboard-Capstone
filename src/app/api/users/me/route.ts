import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";
import Game from "@/models/gameModel";
import Review from "@/models/reviewModel";
import reverseGeocode from "@/helpers/reverseGeocode";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const loggedUser = getDataFromToken(request);
        const { id } = reqBody
        const user = await User.findById(id).select("-password")
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
        const page = NextResponse.json({
            message: "User Found",
            user: {
                ...user,
                library: updatedLibrary,
                reviews: updatedReviews,
                loggedUser
            }
        })
        return page
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
