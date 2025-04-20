// backend/controllers/bookingRequestController.js

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

  // parent ise kendi oluşturduklarını, babysitter ise kendisine gelenleri al
  const filter = {};
  if (req.user.role === "parent") {
    filter.parent = req.user._id;
  } else if (req.user.role === "babysitter") {
    filter.babysitter = req.user._id;
  }

  const list = await BookingRequest.find(filter)
    .populate("parent", "name email")
    .populate("babysitter", "name email");

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
    throw new Error(
      "babysitter, date, startTime ve endTime alanları zorunludur"
    );
  }

  const newReq = await BookingRequest.create({
    parent: req.user._id,
    babysitter,
    date,
    startTime,
    endTime,
  });

  // Oluşan kaydı dönerken populate edelim
  const populated = await newReq
    .populate("parent", "name email")
    .populate("babysitter", "name email")
    .execPopulate();

  res.status(201).json(populated);
});

// @desc    Update an existing booking request
// @route   PUT /api/booking-requests/:id
// @access  Private
exports.updateBookingRequest = asyncHandler(async (req, res) => {
  const request = await BookingRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Booking request bulunamadı");
  }

  // İstendiği takdirde sadece durum vs. alanlarını güncelleyebilirsiniz
  Object.assign(request, req.body);
  const updated = await request.save();

  const populated = await updated
    .populate("parent", "name email")
    .populate("babysitter", "name email")
    .execPopulate();

  res.status(200).json(populated);
});

// @desc    Delete a booking request
// @route   DELETE /api/booking-requests/:id
// @access  Private
exports.deleteBookingRequest = asyncHandler(async (req, res) => {
  const request = await BookingRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Booking request bulunamadı");
  }

  await request.remove();
  res.status(204).end();
});
