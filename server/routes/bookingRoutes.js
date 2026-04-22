import express from "express";
import { changeBookingSataus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";


const bookingRouters = express.Router();

bookingRouters.post("/check-availablity", checkAvailabilityOfCar)
bookingRouters.post("/create", protect, createBooking)
bookingRouters.get("/user", protect, getUserBookings)
bookingRouters.get("/owner", protect, getOwnerBookings)
bookingRouters.post("/change-status", protect, changeBookingSataus)

export default bookingRouters