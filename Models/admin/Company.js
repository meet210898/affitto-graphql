import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "VehicleType",
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyLogo: {
        type: String,
    },
});

mongoose.model("Company", companySchema);
