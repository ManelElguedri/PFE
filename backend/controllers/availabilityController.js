// backend/controllers/availabilityController.js
const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");

// GET /api/availability  (protected)
exports.getAvailability = asyncHandler(async (req, res) => {
  const list = await Availability.find({ babysitter: req.user._id });
  res.json(list);
});

// POST /api/availability (protected)
exports.createAvailability = asyncHandler(async (req, res) => {
  const { day, startTime, endTime } = req.body;
  if (!day || !startTime || !endTime) {
    res.status(400);
    throw new Error("day, startTime and endTime are required");
  }

  // Normalize day: baş harfi büyük, geri küçük
  const normalizedDay =
    day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

  const slot = await Availability.create({
    babysitter: req.user._id,
    day: normalizedDay,
    startTime,
    endTime,
  });

  res.status(201).json(slot);
});

// PUT /api/availability/:id  (protected)
exports.updateAvailability = asyncHandler(async (req, res) => {
  const slot = await Availability.findById(req.params.id);
  if (!slot) {
    res.status(404);
    throw new Error("Availability not found");
  }
  // Sadece kendi slot’unu güncelleyebilirsin
  if (!slot.babysitter.equals(req.user._id)) {
    res.status(403);
    throw new Error("Not allowed");
  }
  Object.assign(slot, req.body);
  await slot.save();
  res.json(slot);
});

// DELETE /api/availability/:id (protected)
exports.deleteAvailability = asyncHandler(async (req, res) => {
  const slot = await Availability.findById(req.params.id);
  if (!slot) {
    res.status(404);
    throw new Error("Availability not found");
  }
  if (!slot.babysitter.equals(req.user._id)) {
    res.status(403);
    throw new Error("Not allowed");
  }
  await slot.remove();
  res.status(204).end();
});
