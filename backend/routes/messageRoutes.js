const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, sendMessage); // POST /api/messages
router.get("/:userId", protect, getMessages); // GET /api/messages/:userId

module.exports = router;
