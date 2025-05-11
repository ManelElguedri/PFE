// backend/routes/bookingRequestRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBookingRequest,
  getBabysitterBookings,
  respondBookingRequest,
} = require("../controllers/bookingRequestController");

router.post("/", protect, createBookingRequest);
router.get("/", protect, getBabysitterBookings);
router.post("/:id/respond", protect, respondBookingRequest);

module.exports = router;
