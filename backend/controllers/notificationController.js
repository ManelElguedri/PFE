// backend/controllers/notificationController.js
const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// GET /api/notifications
// exports.getNotifications = asyncHandler(async (req, res) => {
//   const notes = await Notification.find({});
//   res.json(notes);
// });
exports.getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ userId: req.user._id }).sort(
    "-createdAt"
  );
  res.status(200).json(notes);
});

// POST /api/notifications
exports.createNotification = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;
  const newNote = await Notification.create({ userId, message });
  res.status(201).json(newNote);
});

// PUT /api/notifications/:id/read  → okundu olarak işaretle
// exports.markNotificationRead = asyncHandler(async (req, res) => {
//   const note = await Notification.findById(req.params.id);
//   if (!note) {
//     res.status(404);
//     throw new Error("Notification not found");
//   }
//   note.read = true;
//   await note.save();
//   res.json(note);
// });
exports.markAsRead = asyncHandler(async (req, res) => {
  const note = await Notification.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (note.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not allowed");
  }
  note.isRead = true;
  await note.save();
  res.status(200).json(note);
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
