// backend/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getNotifications,
  createNotification,
  markNotificationRead,
  deleteNotification,
} = require("../controllers/notificationController");

// /api/notifications
router
  .route("/")
  .get(asyncHandler(getNotifications))
  .post(asyncHandler(createNotification));

// /api/notifications/:id
router
  .route("/:id")
  .put(asyncHandler(markNotificationRead))
  .delete(asyncHandler(deleteNotification));

module.exports = router;
