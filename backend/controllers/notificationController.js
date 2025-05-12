// backend/controllers/notificationController.js
const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// GET /api/notifications → Kullanıcıya ait tüm bildirimleri getir
const getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(notes);
});

// POST /api/notifications → Manuel bildirim oluşturmak istersen
const createNotification = asyncHandler(async (req, res) => {
  const { user, message, type } = req.body;
  if (!user || !message) {
    res.status(400);
    throw new Error("User and message are required");
  }
  const newNote = await Notification.create({ user, message, type });
  res.status(201).json(newNote);
});

// PUT /api/notifications/:id → Okundu olarak işaretle
const markAsRead = asyncHandler(async (req, res) => {
  const note = await Notification.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  note.isRead = true;
  await note.save();
  res.status(200).json(note);
});

// DELETE /api/notifications/:id → Bildirimi sil
const deleteNotification = asyncHandler(async (req, res) => {
  const note = await Notification.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  await note.deleteOne();
  res.status(204).end();
});

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
};
