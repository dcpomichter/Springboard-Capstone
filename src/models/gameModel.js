import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a game title"],
        unique: true
    },
    category: {
        type: String,
        required: [true, "Please provide a game category"]
    },
    numberOfPlayers: {
        type: Number,
        required: [true, "Please provide a number of players"]
    },
    gameplayTime: {
        type: Number,
        required: [true, "Please include the gameplay time"]
    },
    publisher: {
        type: String,
    },
    owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema)

export default Game
