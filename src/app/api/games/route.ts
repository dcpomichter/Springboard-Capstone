import { NextRequest, NextResponse } from "next/server";
import Games from "@/models/gameModel"
import { connect } from "@/dbConfig/dbConfig";
import toast from "react-hot-toast";

connect();

export async function GET(request: NextRequest) {
    try {
        const games = await Games.find()
        return NextResponse.json({
            message: "Games Found",
            games
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 400})
    }
}
