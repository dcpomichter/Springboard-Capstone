import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a game title"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating out of 5"]
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
})

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)

export default Review
