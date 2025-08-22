import Tour from "../Models/Tour.js";

// ✅ Get all tours (with optional filters)
export const getTours = async (req, res) => {
  try {
    const { location, date, people } = req.query;

    let query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (date) query.date = date;
    if (people) query.number_of_group = { $gte: people };

    const tours = await Tour.find(query);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    console.error("❌ Error fetching tour:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create a new tour
export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
