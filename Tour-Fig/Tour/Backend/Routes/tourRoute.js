// backend/Routes/tourRoute.js
import express from "express";
import { getTours, getTourById, createTour } from "../Controller/tourController.js";

const router = express.Router();

// Create a new tour
router.post("/", createTour);

// Get all tours (with filters)
router.get("/", getTours);

// Get a single tour by ID
router.get("/:id", getTourById);

export default router;
