// backend/routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getMessages,
  createMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/messageController");

// /api/messages
router
  .route("/")
  .get(asyncHandler(getMessages))
  .post(asyncHandler(createMessage));

// /api/messages/:id
router
  .route("/:id")
  .put(asyncHandler(markAsRead))
  .delete(asyncHandler(deleteMessage));

module.exports = router;
