// backend/routes/bookingRequestRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  getBookingRequests,
  createBookingRequest,
  updateBookingRequest,
  deleteBookingRequest,
} = require("../controllers/bookingRequestController");

// GET  /api/booking-requests    → tüm istekleri getir
// POST /api/booking-requests    → yeni istek oluştur
router
  .route("/")
  .get(asyncHandler(getBookingRequests))
  .post(asyncHandler(createBookingRequest));

// PUT    /api/booking-requests/:id → isteği güncelle
// DELETE /api/booking-requests/:id → isteği sil
router
  .route("/:id")
  .put(asyncHandler(updateBookingRequest))
  .delete(asyncHandler(deleteBookingRequest));

module.exports = router;
