import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Game from "@/models/gameModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { toast } from "react-hot-toast";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {
            title,
            category,
            numberOfPlayers,
            gameplayTime,
            publisher,
            owner
        } = reqBody

        const userId = getDataFromToken(request)

        owner.push(userId)

        //verify if game exists
        const game = await Game.findOne({ title })
        if (game) {
            game.owner.push(userId)
            await game.save();
            return NextResponse.json({ error: "Game already exists, Added Owner" }, { status: 400 })
        }

        const newGame = new Game({
            title,
            category,
            numberOfPlayers,
            gameplayTime,
            publisher,
            owner
        })

        const savedGame = await newGame.save()

        console.log(savedGame)

        return NextResponse.json({
            message: "Game created successfully",
            success: true,
            savedGame
        })

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
