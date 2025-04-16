// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const asyncHandler = require("express-async-handler");

const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// --- Multer configuration for file uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
});

// Handle both profilePicture and idCard fields:
const uploadFields = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
]);

// --- Routes ---

// @route   POST /api/auth/register
// @desc    Register a new user (Parent, Babysitter or Admin)
// @access  Public
router.post("/register", uploadFields, asyncHandler(register));

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", asyncHandler(login));

// @route   POST /api/auth/logout
// @desc    Log user out / clear cookie
// @access  Private
router.post("/logout", protect, asyncHandler(logout));

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", protect, asyncHandler(getProfile));

module.exports = router;
