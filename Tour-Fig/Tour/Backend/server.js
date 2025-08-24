
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./Routes/authRoute.js";
import tourRoutes from "./Routes/tourRoute.js";
import bookingRoutes from "./Routes/bookingRoute.js";
import BikeBookingRoute from "./Routes/BikeBookingRoute.js";

dotenv.config();
const app = express();

// ---------- File paths (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Middleware ----------
app.use(express.json());

// Serve static images from /Uploads
app.use("/images", express.static(path.join(__dirname, "Uploads")));
console.log("Serving images from:", path.join(__dirname, "Uploads"));


// Enable CORS for frontend
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5175","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/bikeBookings", BikeBookingRoute);
// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
