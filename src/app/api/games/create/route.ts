import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Game from "@/models/gameModel";
import Publisher from "@/models/publisherModel"
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import toTitleCase from "@/helpers/titleCase";
import isValidMongoId from "@/helpers/isValidId";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        let {
            title,
            category,
            numberOfPlayers,
            gameplayTime,
            publisher,
            owners
        } = reqBody

        //gather user data
        const userId = getDataFromToken(request)
        const user = await User.findById(userId)

        owners.push(userId)
        publisher = toTitleCase(publisher)

        //verify if publisher exists
        let newPublisher
        const publishers = await Publisher.findOne({ name: publisher })
        if (publishers) {
            publisher = publishers._id
        } else {
            newPublisher = new Publisher({
                name: publisher,
                gamesPublished: []
            })
            await newPublisher.save()
            publisher = newPublisher._id
        }

        //verify if game exists
        let game
        if (isValidMongoId(title)) {
            game = await Game.findById(title)
        }
        console.log(game)
        if (game) {
            game.owners.push(userId)
            await game.save();
            user.library.push(game._id)
            await user.save()
            return NextResponse.json({ error: "Game already exists, Added Owner" }, { status: 301 })
        }

        const newGame = new Game({
            title,
            category,
            numberOfPlayers,
            gameplayTime,
            publisher,
            owners
        })

        const savedGame = await newGame.save()
        user.library.push(savedGame._id)
        await user.save()
        if (newPublisher) {
            newPublisher.gamesPublished.push(savedGame._id)
            await newPublisher.save()
        } else {
            publishers.gamesPublished.push(savedGame._id)
            await publishers.save()
        }

        return NextResponse.json({
            message: "Game created successfully",
            success: true,
            savedGame
        })

    }
    catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
