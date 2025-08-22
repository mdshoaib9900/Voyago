// Controller/BookingController.js
import Booking from '../Models/Booking.js';

const BookingController = {
  createBooking: async (req, res) => {
    // ✅ 1. Destructure expected fields from the request body
    const { 
      bookingDate, 
      bookingTime, 
      participants, 
      totalPrice, 
      customerDetails,
      paymentDetails 
    } = req.body;

    // ✅ 2. Validate required booking info
    if (!bookingDate || !bookingTime || !participants || !totalPrice || !customerDetails) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information.',
      });
    }

    // ✅ 3. Validate payment info if provided
    if (paymentDetails) {
      if (!paymentDetails.method) {
        return res.status(400).json({
          success: false,
          message: 'Payment method is required.',
        });
      }

      if (paymentDetails.method === "dummyCredit") {
        if (!paymentDetails.card || !paymentDetails.card.number || !paymentDetails.card.cvc) {
          return res.status(400).json({
            success: false,
            message: 'Dummy credit card details are missing.',
          });
        }
      }

      if (paymentDetails.method === "stripe") {
        if (!paymentDetails.stripePaymentId) {
          return res.status(400).json({
            success: false,
            message: 'Stripe payment ID is required.',
          });
        }
      }
    }

    try {
      // ✅ 4. Create the booking (with optional payment details)
      const newBooking = new Booking({
        bookingDate,
        bookingTime,
        participants,
        totalPrice,
        customerDetails,
        paymentDetails: paymentDetails || null, // allow optional
      });

      await newBooking.save();

      res.status(201).json({ 
        success: true, 
        message: 'Booking created successfully!', 
        data: newBooking 
      });

    } catch (err) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create booking. Server error.',
        error: err.message
      });
    }
  },
};

export default BookingController;
