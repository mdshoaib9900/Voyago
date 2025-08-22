import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "./Models/Tour.js";
import { tourData } from "./data/toursData.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Tour.deleteMany({});
  await Tour.insertMany(tourData);
  console.log("✅ Tours seeded");
  mongoose.disconnect();
});
