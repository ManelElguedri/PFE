// backend/controllers/parentController.js
const asyncHandler = require("express-async-handler");
const Parent = require("../models/parentModel");

// GET /api/parents
exports.getParents = asyncHandler(async (req, res) => {
  const parents = await Parent.find({});
  res.json(parents);
});

// POST /api/parents
exports.createParent = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, address, numberOfChildren, gender } =
    req.body;
  const newParent = await Parent.create({
    firstname,
    lastname,
    email,
    address,
    numberOfChildren,
    gender,
  });
  res.status(201).json(newParent);
});

// PUT /api/parents/:id
exports.updateParent = asyncHandler(async (req, res) => {
  const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!parent) {
    res.status(404);
    throw new Error("Parent not found");
  }
  res.json(parent);
});

// DELETE /api/parents/:id
exports.deleteParent = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.params.id);
  if (!parent) {
    res.status(404);
    throw new Error("Parent not found");
  }
  await parent.remove();
  res.status(204).end();
});
