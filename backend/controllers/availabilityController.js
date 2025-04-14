// backend/controllers/availabilityController.js
const asyncHandler = require("express-async-handler");
const Availability = require("../models/Availability");

// GET /api/availability
exports.getAvailability = asyncHandler(async (req, res) => {
  const list = await Availability.find({});
  res.json(list);
});

// POST /api/availability
exports.createAvailability = asyncHandler(async (req, res) => {
  const newItem = await Availability.create(req.body);
  res.status(201).json(newItem);
});

// PUT /api/availability/:id
exports.updateAvailability = asyncHandler(async (req, res) => {
  const updated = await Availability.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE /api/availability/:id
exports.deleteAvailability = asyncHandler(async (req, res) => {
  await Availability.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
