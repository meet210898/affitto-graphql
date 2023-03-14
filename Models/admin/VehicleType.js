import mongoose from "mongoose";

const vehicleTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    trim: true,
  },
  typeImage: {
    type: String,
  },
});

mongoose.model("VehicleType", vehicleTypeSchema);
