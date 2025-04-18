// backend/routes/parentRoutes.js
const express = require("express");
const router = express.Router();

const {
  getParents,
  createParent,
  updateParent,
  deleteParent,
} = require("../controllers/parentController");

const { protect } = require("../middleware/authMiddleware");

// @route   GET /api/parents
// @desc    List all parents (optional ?search= filter)
// @access  Public
router.get("/", getParents);

// @route   POST /api/parents
// @desc    Create a new parent
// @access  Private (authenticated users only)
router.post("/", protect, createParent);

// @route   PUT /api/parents/:id
// @desc    Update a parent by ID
// @access  Private
router.put("/:id", protect, updateParent);

// @route   DELETE /api/parents/:id
// @desc    Delete a parent by ID
// @access  Private
router.delete("/:id", protect, deleteParent);

module.exports = router;
