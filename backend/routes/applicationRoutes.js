const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getApplications,
  createApplication,
} = require("../controllers/applicationController");

// GET   /api/applications   → tüm başvuruları getir
// POST  /api/applications   → yeni başvuru oluştur
router
  .route("/")
  .get(protect, getApplications)
  .post(protect, createApplication);

module.exports = router;
