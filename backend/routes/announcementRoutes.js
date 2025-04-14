// backend/routes/announcementRoutes.js

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Controller dosyanızın path'ini projenizdeki klasör yapısına göre kontrol edin:
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

// GET  /api/announcements      → tüm duyuruları getir
// POST /api/announcements      → yeni duyuru oluştur
router
  .route("/")
  .get(asyncHandler(getAnnouncements))
  .post(asyncHandler(createAnnouncement));

// PUT    /api/announcements/:id → var olan duyuruyu güncelle
// DELETE /api/announcements/:id → var olan duyuruyu sil
router
  .route("/:id")
  .put(asyncHandler(updateAnnouncement))
  .delete(asyncHandler(deleteAnnouncement));

module.exports = router;
