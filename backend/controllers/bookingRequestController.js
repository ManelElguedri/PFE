const asyncHandler = require("express-async-handler");
const BookingRequest = require("../models/BookingRequest");

// @desc    Get booking requests for the current user
// @route   GET /api/booking-requests
// @access  Private
exports.getBookingRequests = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authenticated");
  }

  const filter = {};
  if (req.user.role === "parent") {
    filter.parent = req.user._id;
  } else if (req.user.role === "babysitter") {
    filter.babysitter = req.user._id;
  }

  const list = await BookingRequest.find(filter)
    .populate("parent", "name email")
    .populate("babysitter", "name email")
    .sort("-createdAt");

  res.status(200).json(list);
});

// @desc    Create a new booking request (only parents)
// @route   POST /api/booking-requests
// @access  Private
exports.createBookingRequest = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "parent") {
    res.status(403);
    throw new Error("Only parents can create booking requests");
  }

  const { babysitter, date, startTime, endTime } = req.body;
  if (!babysitter || !date || !startTime || !endTime) {
    res.status(400);
    throw new Error("babysitter, date, startTime and endTime are required");
  }

  const newReq = await BookingRequest.create({
    parent: req.user._id,
    babysitter,
    date,
    startTime,
    endTime,
  });

  // Popüle edilmiş versiyonunu gönder
  const populated = await BookingRequest.findById(newReq._id)
    .populate("parent", "name email")
    .populate("babysitter", "name email");

  res.status(201).json(populated);
});

// @desc    Update an existing booking request
// @route   PUT /api/booking-requests/:id
// @access  Private
exports.updateBookingRequest = asyncHandler(async (req, res) => {
  const updated = await BookingRequest.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .populate("parent", "name email")
    .populate("babysitter", "name email");

  if (!updated) {
    res.status(404);
    throw new Error("Booking request not found");
  }

  res.status(200).json(updated);
});

// @desc    Delete a booking request
// @route   DELETE /api/booking-requests/:id
// @access  Private
exports.deleteBookingRequest = asyncHandler(async (req, res) => {
  const reqDoc = await BookingRequest.findById(req.params.id);
  if (!reqDoc) {
    res.status(404);
    throw new Error("Booking request not found");
  }
  await reqDoc.remove();
  res.status(204).end();
});
