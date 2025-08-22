// routes/bookings.js
import express from "express";
import Booking from "../Models/Booking.js";

const router = express.Router();

// Create a booking
router.post("/", async (req, res) => {
  try {
    const { bookingDate, bookingTime, participants, totalPrice, customerDetails, paymentDetails } = req.body;

    // If payment method is Stripe, ignore card fields
    if (paymentDetails.method === "stripe") {
      paymentDetails.card = {}; // remove card info completely
    }

    // If dummyCredit, keep card fields so schema pre-save hook will hash them
    if (paymentDetails.method === "dummyCredit") {
      if (!paymentDetails.card?.number || !paymentDetails.card?.cvc) {
        return res.status(400).json({ message: "Card number and CVC required for dummy payments" });
      }
    }

    const booking = new Booking({
      bookingDate,
      bookingTime,
      participants,
      totalPrice,
      customerDetails,
      paymentDetails,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
