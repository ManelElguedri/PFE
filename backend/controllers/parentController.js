// backend/controllers/parentController.js
const asyncHandler = require("express-async-handler");
const Parent = require("../models/parentModel");
const User = require("../models/User"); // Assuming you have a User model

// @desc    Get all parents (with optional search filter)
// @route   GET /api/parents?search=...
// @access  Public
exports.getParents = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const filter = { role: "parent" };

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { firstname: regex },
      { lastname: regex },
      { email: regex },
      { address: regex },
    ];
  }

  const parents = await User.find(filter).select("-password");
  res.status(200).json(parents);
});

// @desc    Create a new parent
// @route   POST /api/parents
// @access  Public (or protected, as you choose)
exports.createParent = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, address, numberOfChildren, gender } =
    req.body;

  // Basic validation
  if (!firstname || !lastname || !email) {
    res.status(400);
    throw new Error("Firstname, lastname and email are required");
  }

  // Prevent duplicate emails
  const exists = await Parent.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("A parent with that email already exists");
  }

  const parent = await Parent.create({
    firstname,
    lastname,
    email,
    address,
    numberOfChildren,
    gender,
  });

  res.status(201).json(parent);
});

// @desc    Update an existing parent
// @route   PUT /api/parents/:id
// @access  Public (or protected)
exports.updateParent = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.params.id);
  if (!parent) {
    res.status(404);
    throw new Error("Parent not found");
  }

  // Merge req.body into the document
  Object.assign(parent, req.body);
  const updated = await parent.save();

  res.status(200).json(updated);
});

// @desc    Delete a parent
// @route   DELETE /api/parents/:id
// @access  Public (or protected)
exports.deleteParent = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.params.id);
  if (!parent) {
    res.status(404);
    throw new Error("Parent not found");
  }

  await parent.deleteOne();
  res.status(204).end();
});
