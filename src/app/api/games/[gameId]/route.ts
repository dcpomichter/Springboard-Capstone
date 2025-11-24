import { connect } from "@/dbConfig/dbConfig";
import isValidMongoId from "@/helpers/isValidId";
import Game from "@/models/gameModel";
import Publisher from "@/models/publisherModel";
import Review from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { gameId } = reqBody
        const game = await Game.findById(gameId)

        if (!game) {
            return NextResponse.json({ error: "Game does not exist" }, { status: 400 })
        }

        let publisherDetails

        if (isValidMongoId(game.publisher)) {
            publisherDetails = await Publisher.findById(game.publisher)
        }

        let detailedReviews = []

        for (let review of game.reviews) {
            const reviewDetails = await Review.findById(review)
            detailedReviews.push(reviewDetails)
        }

        return NextResponse.json({
            message: "Game Found",
            game: {
                ...game,
                publisher: publisherDetails,
                reviews: detailedReviews
            }
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
