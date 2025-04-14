// controllers/announcementController.js
const asyncHandler = require("express-async-handler");
const Announcement = require("../models/announcementModel");

// GET /api/announcements
exports.getAnnouncements = asyncHandler(async (req, res) => {
  const list = await Announcement.find({});
  res.json(list);
});

// POST /api/announcements
exports.createAnnouncement = asyncHandler(async (req, res) => {
  const newAnn = await Announcement.create(req.body);
  res.status(201).json(newAnn);
});

// PUT /api/announcements/:id
exports.updateAnnouncement = asyncHandler(async (req, res) => {
  const updated = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE /api/announcements/:id
exports.deleteAnnouncement = asyncHandler(async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
