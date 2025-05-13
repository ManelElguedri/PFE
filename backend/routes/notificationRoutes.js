const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

// Tüm bildirimleri getir
router.get("/", protect, asyncHandler(getNotifications));
// Tek bir bildirimi okunmuş olarak işaretle
router.put("/:id", protect, asyncHandler(markAsRead));

module.exports = router;
