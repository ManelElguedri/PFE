// backend/controllers/babysitterController.js

const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");
const BookingRequest = require("../models/BookingRequest");
const JobApplication = require("../models/JobApplication");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const User = require("../models/User");

// @desc    Get all users with role "babysitter" (optional search)
// @route   GET /api/babysitters?search=...
// @access  Public
const getBabysitters = asyncHandler(async (req, res) => {
  const { minAge, maxAge } = req.query;
  const { search } = req.query;
  const { address } = req.query;
  const filter = { role: "babysitter" };

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { fullName: regex }, // modelinizde fullName varsa
      { name: regex }, // yoksa name
      { email: regex },
    ];
  }

  if (address) {
    const locationRegex = new RegExp(address, "i");
    filter.address = locationRegex;
  }

  if (minAge || maxAge) {
    filter.age = {};
    if (minAge) filter.age.$gte = parseInt(minAge);
    if (maxAge) filter.age.$lte = parseInt(maxAge);
  }

  const list = await User.find(filter).select("-password");
  res.status(200).json(list);
});

// @desc    Get current babysitter’s availability slots
// @route   GET /api/babysitters/availability
// @access  Private
const getAvailability = asyncHandler(async (req, res) => {
  const list = await Availability.find({ babysitter: req.user._id });
  res.json(list);
});

// @desc    Add a new availability slot
// @route   POST /api/babysitters/availability
// @access  Private
const addAvailability = asyncHandler(async (req, res) => {
  const avail = await Availability.create({
    babysitter: req.user._id,
    ...req.body,
  });
  res.status(201).json(avail);
});

// @desc    Delete an availability slot
// @route   DELETE /api/babysitters/availability/:id
// @access  Private
const deleteAvailability = asyncHandler(async (req, res) => {
  await Availability.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// @desc    Get booking requests for the babysitter
// @route   GET /api/babysitters/booking-requests
// @access  Private
const getBookingRequests = asyncHandler(async (req, res) => {
  const list = await BookingRequest.find({ babysitter: req.user._id }).populate(
    "parent",
    "fullName email"
  );
  res.json(list);
});

// @desc    Accept a booking request
// @route   POST /api/babysitters/booking-requests/:id/accept
// @access  Private
const acceptRequest = asyncHandler(async (req, res) => {
  const br = await BookingRequest.findById(req.params.id);
  if (!br) {
    res.status(404);
    throw new Error("BookingRequest not found");
  }
  br.status = "accepted";
  await br.save();
  res.json(br);
});

// @desc    Decline a booking request
// @route   POST /api/babysitters/booking-requests/:id/decline
// @access  Private
const declineRequest = asyncHandler(async (req, res) => {
  const br = await BookingRequest.findById(req.params.id);
  if (!br) {
    res.status(404);
    throw new Error("BookingRequest not found");
  }
  br.status = "declined";
  await br.save();
  res.json(br);
});

// @desc    Get job applications already made by this babysitter
// @route   GET /api/babysitters/job-applications
// @access  Private
const getJobApplications = asyncHandler(async (req, res) => {
  const list = await JobApplication.find({ babysitter: req.user._id }).populate(
    "announcement"
  );
  res.json(list);
});

// @desc    Apply for a new job (announcement)
// @route   POST /api/babysitters/job-applications/:id/apply
// @access  Private
const applyForJob = asyncHandler(async (req, res) => {
  const app = await JobApplication.create({
    babysitter: req.user._id,
    announcement: req.params.id,
  });
  res.status(201).json(app);
});

// @desc    Get messages sent *to* this babysitter
// @route   GET /api/babysitters/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const msgs = await Message.find({ to: req.user._id }).populate(
    "from",
    "fullName email"
  );
  res.json(msgs);
});

// @desc    Send a new message
// @route   POST /api/babysitters/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const msg = await Message.create({
    from: req.user._id,
    ...req.body,
  });
  res.status(201).json(msg);
});

// @desc    Get notifications for this babysitter
// @route   GET /api/babysitters/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ user: req.user._id });
  res.json(notes);
});

module.exports = {
  getBabysitters,
  getAvailability,
  addAvailability,
  deleteAvailability,
  getBookingRequests,
  acceptRequest,
  declineRequest,
  getJobApplications,
  applyForJob,
  getMessages,
  sendMessage,
  getNotifications,
};
