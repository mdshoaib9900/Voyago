import TourModel from "../Models/TourModel.js";

export const fetchTours = async (req, res) => {
  try {
    const filters = req.query;

    const query = {};
    if (filters.type) query.type = filters.type;
    if (filters.peopleCount) query.peopleCount = filters.peopleCount;
    if (filters.date) query.date = filters.date;
    if (filters.time) query.time = filters.time;
    if (filters.name) query.name = filters.name;
    if (filters.transport) query.transport = filters.transport;
    if (filters.category) query.category = filters.category;

    const tours = await TourModel.find(query);
    res.status(200).json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching tours" });
  }
};
