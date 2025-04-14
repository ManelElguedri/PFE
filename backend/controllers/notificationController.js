// backend/controllers/notificationController.js
const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// GET /api/notifications
exports.getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({});
  res.json(notes);
});

// POST /api/notifications
exports.createNotification = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;
  const newNote = await Notification.create({ userId, message });
  res.status(201).json(newNote);
});

// PUT /api/notifications/:id/read  → okundu olarak işaretle
exports.markNotificationRead = asyncHandler(async (req, res) => {
  const note = await Notification.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Notification not found");
  }
  note.read = true;
  await note.save();
  res.json(note);
});

// DELETE /api/notifications/:id
exports.deleteNotification = asyncHandler(async (req, res) => {
  const note = await Notification.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Notification not found");
  }
  await note.remove();
  res.status(204).end();
});
