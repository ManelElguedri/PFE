// backend/routes/babysitterRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/babysitterController");

// @route   GET /api/babysitters
// @desc    List all babysitters (optional ?search=...)
// @access  Public (or protect it if needed)
router.get("/", /* protect, */ getBabysitters);

// @route   GET/POST /api/babysitters/availability
// @desc    Get or add availability slots
// @access  Private
router
  .route("/availability")
  .get(protect, getAvailability)
  .post(protect, addAvailability);

// @route   DELETE /api/babysitters/availability/:id
// @desc    Remove an availability slot
// @access  Private
router.delete("/availability/:id", protect, deleteAvailability);

// @route   GET /api/babysitters/booking-requests
// @desc    List booking requests
// @access  Private
router.get("/booking-requests", protect, getBookingRequests);

// @route   POST /api/babysitters/booking-requests/:id/accept
// @desc    Accept a booking request
// @access  Private
router.post("/booking-requests/:id/accept", protect, acceptRequest);

// @route   POST /api/babysitters/booking-requests/:id/decline
// @desc    Decline a booking request
// @access  Private
router.post("/booking-requests/:id/decline", protect, declineRequest);

// @route   GET /api/babysitters/job-applications
// @desc    List available jobs
// @access  Private
router.get("/job-applications", protect, getJobApplications);

// @route   POST /api/babysitters/job-applications/:id/apply
// @desc    Apply for a job
// @access  Private
router.post("/job-applications/:id/apply", protect, applyForJob);

// @route   GET /api/babysitters/messages
// @desc    Fetch messages
// @access  Private
router.get("/messages", protect, getMessages);

// @route   POST /api/babysitters/messages
// @desc    Send a message
// @access  Private
router.post("/messages", protect, sendMessage);

// @route   GET /api/babysitters/notifications
// @desc    Fetch notifications
// @access  Private
router.get("/notifications", protect, getNotifications);

module.exports = router;
