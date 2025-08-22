// Models/Booking.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const BookingSchema = new mongoose.Schema({
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },

  participants: {
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
  },

  totalPrice: { type: Number, required: true },

  customerDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },

  paymentDetails: {
    method: { 
      type: String, 
      enum: ["credit", "dummyCredit","stripe"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Completed", "Paid"], 
      default: "Pending" 
    },
    card: {
      number: { type: String },  // will be hashed
      expiry: { type: String },  // can be stored as plain (not sensitive)
      cvc: { type: String },     // will be hashed
    },
    stripePaymentId: { type: String }, // for Stripe payments
  },
}, { timestamps: true });

// 🔑 Hash sensitive card fields before saving
BookingSchema.pre("save", async function (next) {
  if (this.isModified("paymentDetails.card.number") && this.paymentDetails.card?.number) {
    this.paymentDetails.card.number = await bcrypt.hash(
      this.paymentDetails.card.number,
      10
    );
  }

  if (this.isModified("paymentDetails.card.cvc") && this.paymentDetails.card?.cvc) {
    this.paymentDetails.card.cvc = await bcrypt.hash(
      this.paymentDetails.card.cvc,
      10
    );
  }

  next();
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
