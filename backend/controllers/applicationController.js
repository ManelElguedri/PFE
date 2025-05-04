const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");

// GET /api/availability
exports.getAvailability = asyncHandler(async (req, res) => {
  const list = await Availability.find({ babysitter: req.user._id });
  res.json(list);
});

// POST /api/availability
exports.createAvailability = asyncHandler(async (req, res) => {
  const { day, startTime, endTime } = req.body;
  if (!day || !startTime || !endTime) {
    res.status(400);
    throw new Error("`day`, `startTime` and `endTime` are required");
  }
  const avail = await Availability.create({
    babysitter: req.user._id,
    day,
    startTime,
    endTime,
  });
  res.status(201).json(avail);
});

// PUT /api/availability/:id
exports.updateAvailability = asyncHandler(async (req, res) => {
  const avail = await Availability.findById(req.params.id);
  if (!avail) {
    res.status(404);
    throw new Error("Availability not found");
  }
  Object.assign(avail, req.body);
  const updated = await avail.save();
  res.json(updated);
});

// DELETE /api/availability/:id
exports.deleteAvailability = asyncHandler(async (req, res) => {
  const avail = await Availability.findById(req.params.id);
  if (!avail) {
    res.status(404);
    throw new Error("Availability not found");
  }
  await avail.remove();
  res.status(204).end();
});
