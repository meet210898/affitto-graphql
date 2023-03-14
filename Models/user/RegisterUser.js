import mongoose from "mongoose";

const registerUserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
        },
        stateId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "State",
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "City",
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        isVerify: {
            type: Boolean,
            required: true,
            default: false,
        },
        personalImage: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.model("RegisterUser", registerUserSchema);
