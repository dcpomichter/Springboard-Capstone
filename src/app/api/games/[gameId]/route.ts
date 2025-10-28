import { connect } from "@/dbConfig/dbConfig";
import Game from "@/models/gameModel";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { gameId } = reqBody
        const game = await Game.findById(gameId)

        if (!game) {
            return NextResponse.json({ error: "Game does not exist" }, { status: 400 })
        }

        return NextResponse.json({
            message: "Game Found",
            game
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
