import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a publisher name"],
        unique: true
    },
    established: {
        type: Date,
    },
    gamesPublished: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }
    ]
})

const Publisher = mongoose.models.Publisher || mongoose.model("Publisher", gameSchema)

export default Publisher
