const express = require("express");
const router = express.Router();
const {
  createBookingRequest,
  getBabysitterBookings,
  respondBookingRequest,
} = require("../controllers/bookingRequestController");

const { protect } = require("../middleware/authMiddleware");

// GET booking requests for babysitter
router.get("/", protect, getBabysitterBookings);

// POST booking request (parent → babysitter)
router.post("/", protect, createBookingRequest);

// ✅ PUT for accept/decline
router.put("/:id", protect, respondBookingRequest);

module.exports = router;
