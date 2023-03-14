import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true,
        trim: true,
    },
    stateImage: {
        type: String,
    },
})

mongoose.model("State", stateSchema)