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

// ── Multer configuration for file uploads ──────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads klasörünü proje kökünde oluşturduğunuzdan emin olun
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Sadece image dosyalarına izin ver
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // maksimum 2MB
});

// İki alan (profilePicture & idCard) için upload middleware
const uploadFields = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
]);

// ── Auth Routes ────────────────────────────────────────────────────────────

// Register: yeni kullanıcı oluştur (public)
router.post("/register", uploadFields, asyncHandler(register));

// Login: giriş ve token alma (public)
router.post("/login", asyncHandler(login));

// Logout: token’ı temizle / çıkış yap (private)
router.post("/logout", protect, asyncHandler(logout));

// Profile: oturumlu kullanıcı bilgilerini getir (private)
router.get("/profile", protect, asyncHandler(getProfile));
// // Logout: çıkış yap (private)
router.post("/logout", protect, asyncHandler(logout));

module.exports = router;
