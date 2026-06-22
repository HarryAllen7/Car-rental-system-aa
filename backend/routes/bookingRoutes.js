const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking, getAllBookings, approveBooking } = require("../controllers/bookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/", protect, isAdmin, getAllBookings);
router.put("/:id/approve", protect, isAdmin, approveBooking);

module.exports = router;