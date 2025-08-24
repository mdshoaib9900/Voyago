import mongoose from "mongoose";

const bikeBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

const BikeBooking = mongoose.model("BikeBooking", bikeBookingSchema);
export default BikeBooking;
