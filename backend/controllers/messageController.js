// backend/controllers/messageController.js

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Get messages for the logged-in user
// @route   GET /api/messages
// @access  Private
exports.getMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const msgs = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  })
    .populate("senderId", "name email")
    .populate("receiverId", "name email")
    .sort("-createdAt");

  res.status(200).json(msgs);
});

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { receiverId, text } = req.body;

  // Validation
  if (!receiverId || !text) {
    res.status(400);
    throw new Error("receiverId and text are required");
  }
  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    res.status(400);
    throw new Error("receiverId must be a valid ObjectId");
  }

  // Ensure receiver exists
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    res.status(404);
    throw new Error("Receiver not found");
  }

  // Create message
  let msg = await Message.create({ senderId, receiverId, text });

  // Populate the sender and receiver fields (Mongoose 6+)
  msg = await msg.populate([
    { path: "senderId", select: "name email" },
    { path: "receiverId", select: "name email" },
  ]);

  res.status(201).json(msg);
});
