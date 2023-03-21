import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleType",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  vehicleName: {
    type: String,
    trim: true,
  },
  vehicleImage: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  seats: {
    type: Number,
    trim: true,
  },
  door: {
    type: Number,
    trim: true,
  },
  fuelType: {
    type: String,
    trim: true,
  },
  transmission: {
    type: String,
    trim: true,
  },
  ac: {
    type: Boolean,
    default: true,
  },
  rcImage: {
    type: String,
  },
  rcNumber: {
    type: String,
    trim: true,
  },
  pucImage: {
    type: String,
  },
  priceperday: {
    type: Number,
    trim: true,
  },
  insuranceImage: {
    type: String,
  },
});

mongoose.model("Vehicle", vehicleSchema);
