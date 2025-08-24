import express from "express";
import { createBooking, getBookings } from "../Controller/BikeBookingController.js";

const router = express.Router();

router.post("/", createBooking);   
router.get("/", getBookings);      

export default router;
