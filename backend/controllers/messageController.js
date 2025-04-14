// backend/controllers/messageController.js
const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

// GET /api/messages
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

// POST /api/messages
exports.createMessage = asyncHandler(async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const newMsg = await Message.create({ senderId, receiverId, content });
  res.status(201).json(newMsg);
});

// PUT /api/messages/:id/read  → okundu olarak işaretle
exports.markAsRead = asyncHandler(async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  msg.read = true;
  await msg.save();
  res.json(msg);
});

// DELETE /api/messages/:id
exports.deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  await msg.remove();
  res.status(204).end();
});
