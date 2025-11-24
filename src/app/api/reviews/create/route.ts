import { connect } from "@/dbConfig/dbConfig";
import Review from "@/models/reviewModel";
import Game from "@/models/gameModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        let {
            title,
            description,
            rating,
            reviewer,
            game
        } = reqBody

        const userId = getDataFromToken(request)
        const user = await User.findById(userId)

        reviewer = userId



        //verify if game exists

        const gameDetails = await Game.findById(game)

        if (!gameDetails) {
            return NextResponse.json({ error: "Game does not exist" }, { status: 400 })
        }

        const newReview = new Review({
            title,
            description,
            rating,
            reviewer,
            game
        })

        const savedReview = await newReview.save()

        gameDetails.reviews.push(savedReview._id)
        await gameDetails.save()
        user.reviews.push(savedReview._id)
        await user.save()

        return NextResponse.json({
            message: "Review created successfully",
            success: true,
            savedReview
        })

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
