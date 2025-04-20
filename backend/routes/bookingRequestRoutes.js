// backend/routes/bookingRequestRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");

const {
  getBookingRequests,
  createBookingRequest,
  updateBookingRequest,
  deleteBookingRequest,
} = require("../controllers/bookingRequestController");

// @route   GET  /api/booking-requests
// @desc    Tüm booking isteklerini getir
// @access  Private (sadece login olmuş kullanıcılar)
router
  .route("/")
  .get(protect, asyncHandler(getBookingRequests))
  .post(protect, asyncHandler(createBookingRequest));

// @route   PUT    /api/booking-requests/:id
// @route   DELETE /api/booking-requests/:id
// @desc    Belirli bir isteği güncelle veya sil
// @access  Private
router
  .route("/:id")
  .put(protect, asyncHandler(updateBookingRequest))
  .delete(protect, asyncHandler(deleteBookingRequest));

module.exports = router;
