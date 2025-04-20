// backend/controllers/announcementController.js
const asyncHandler = require("express-async-handler");
const Announcement = require("../models/announcementModel");

// @desc    Get all announcements (optional search)
// @route   GET /api/announcements?search=...
// @access  Public
const getAnnouncements = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const filter = {};

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { title: regex },
      { description: regex },
      { location: regex },
      { parentName: regex },
    ];
  }

  const list = await Announcement.find(filter).sort({ date: -1 });
  res.status(200).json(list);
});

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Public (veya protect ile koruyun)
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, description, date, location, parentName, childrenAge } =
    req.body;

  // Zorunlu alan kontrolü
  if (!title || !description || !parentName) {
    res.status(400);
    throw new Error("Title, description ve parentName alanları zorunludur");
  }

  const newAnn = await Announcement.create({
    title,
    description,
    date,
    location,
    parentName,
    childrenAge,
  });

  res.status(201).json(newAnn);
});

// @desc    Update an existing announcement
// @route   PUT /api/announcements/:id
// @access  Public (veya protect ile koruyun)
const updateAnnouncement = asyncHandler(async (req, res) => {
  const ann = await Announcement.findById(req.params.id);
  if (!ann) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  const updated = await Announcement.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updated);
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Public (veya protect ile koruyun)
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const ann = await Announcement.findById(req.params.id);
  if (!ann) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  await ann.remove();
  res.status(204).end();
});

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
