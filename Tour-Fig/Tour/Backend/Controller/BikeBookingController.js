import BikeBooking from "../Models/BikeBooking.js";

// ✅ Create booking
export const createBooking = async (req, res) => {
  try {
    const newBooking = new BikeBooking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: "Failed to create booking", details: err.message });
  }
};

// ✅ Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await BikeBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
