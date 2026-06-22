const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    image: { type: String, default: "" },
    seats: { type: Number, default: 5 },
    fuelType: { type: String, default: "Petrol" },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);