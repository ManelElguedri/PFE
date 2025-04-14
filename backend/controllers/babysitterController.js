const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");
const BookingRequest = require("../models/BookingRequest");
const JobApplication = require("../models/JobApplication");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

// Availability routes
const getAvailability = asyncHandler(async (req, res) => {
  const list = await Availability.find({ babysitter: req.user._id });
  res.json(list);
});
const addAvailability = asyncHandler(async (req, res) => {
  const avail = await Availability.create({
    babysitter: req.user._id,
    ...req.body,
  });
  res.json(avail);
});
const deleteAvailability = asyncHandler(async (req, res) => {
  await Availability.findByIdAndDelete(req.params.id);
  res.json({});
});

// Booking requests
const getBookingRequests = asyncHandler(async (req, res) => {
  const list = await BookingRequest.find({ babysitter: req.user._id }).populate(
    "parent",
    "name"
  );
  res.json(list);
});
const acceptRequest = asyncHandler(async (req, res) => {
  const br = await BookingRequest.findById(req.params.id);
  br.status = "accepted";
  await br.save();
  res.json({});
});
const declineRequest = asyncHandler(async (req, res) => {
  const br = await BookingRequest.findById(req.params.id);
  br.status = "declined";
  await br.save();
  res.json({});
});

// Job applications
const getJobApplications = asyncHandler(async (req, res) => {
  const list = await JobApplication.find({ babysitter: req.user._id }).populate(
    "announcement"
  );
  res.json(list);
});
const applyForJob = asyncHandler(async (req, res) => {
  const app = await JobApplication.create({
    babysitter: req.user._id,
    announcement: req.params.id,
  });
  res.json(app);
});

// Messages
const getMessages = asyncHandler(async (req, res) => {
  const msgs = await Message.find({ to: req.user._id }).populate(
    "from",
    "name"
  );
  res.json(msgs);
});
const sendMessage = asyncHandler(async (req, res) => {
  const msg = await Message.create({ from: req.user._id, ...req.body });
  res.json(msg);
});

// Notifications
const getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ user: req.user._id });
  res.json(notes);
});

module.exports = {
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
