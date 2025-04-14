const express = require("express");
const {
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
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/availability")
  .get(protect, getAvailability)
  .post(protect, addAvailability);
router.delete("/availability/:id", protect, deleteAvailability);

router.get("/booking-requests", protect, getBookingRequests);
router.post("/booking-requests/:id/accept", protect, acceptRequest);
router.post("/booking-requests/:id/decline", protect, declineRequest);

router.get("/job-applications", protect, getJobApplications);
router.post("/job-applications/:id/apply", protect, applyForJob);

router.get("/messages", protect, getMessages);
router.post("/messages", protect, sendMessage);

router.get("/notifications", protect, getNotifications);

module.exports = router;
