import mongoose from "mongoose";

export default function isValidMongoId(idString: string) {
    return mongoose.Types.ObjectId.isValid(idString);
}
