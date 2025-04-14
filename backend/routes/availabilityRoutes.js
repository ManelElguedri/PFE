// backend/routes/availabilityRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

// GET  /api/availability      → tüm availability kayıtlarını getir
// POST /api/availability      → yeni availability oluştur
router
  .route("/")
  .get(asyncHandler(getAvailability))
  .post(asyncHandler(createAvailability));

// PUT    /api/availability/:id → var olan kaydı güncelle
// DELETE /api/availability/:id → var olan kaydı sil
router
  .route("/:id")
  .put(asyncHandler(updateAvailability))
  .delete(asyncHandler(deleteAvailability));

module.exports = router;
