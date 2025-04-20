// backend/routes/announcementRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

// GET  /api/announcements
// POST /api/announcements
router
  .route("/")
  .get(getAnnouncements)
  // eğer yeni duyuru eklemek için giriş gerekecekse alttaki satıra protect ekleyin:
  .post(/* protect, */ createAnnouncement);

// PUT    /api/announcements/:id
// DELETE /api/announcements/:id
router
  .route("/:id")
  // güncelleme ve silme için koruma gerekiyorsa her ikisine de protect ekleyin:
  .put(/* protect, */ updateAnnouncement)
  .delete(/* protect, */ deleteAnnouncement);

module.exports = router;
