import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price_per_person: { type: Number, required: true },
  date: { type: String, required: true },
  number_of_group: { type: Number, required: true },
  description: { type: String },
  image_url: { type: String }, // store image path (ex: /images/florence.png)
});

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
