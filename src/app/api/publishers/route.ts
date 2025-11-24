import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import Publisher from "@/models/publisherModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const publishers = await Publisher.find()
        return NextResponse.json({
            message: "Games Found",
            publishers
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
