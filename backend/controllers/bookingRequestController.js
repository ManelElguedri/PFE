// backend/controllers/bookingRequestController.js
const asyncHandler = require("express-async-handler");
const BookingRequest = require("../models/BookingRequest");

// GET /api/booking-requests
exports.getBookingRequests = asyncHandler(async (req, res) => {
  const list = await BookingRequest.find({});
  res.json(list);
});

// POST /api/booking-requests
exports.createBookingRequest = asyncHandler(async (req, res) => {
  const newReq = await BookingRequest.create(req.body);
  res.status(201).json(newReq);
});

// PUT /api/booking-requests/:id
exports.updateBookingRequest = asyncHandler(async (req, res) => {
  const updated = await BookingRequest.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE /api/booking-requests/:id
exports.deleteBookingRequest = asyncHandler(async (req, res) => {
  await BookingRequest.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
