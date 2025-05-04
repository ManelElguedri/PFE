// backend/routes/availabilityRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

// Tüm endpoint’leri koru, böylece req.user tanımlı olur
router.use(protect);

router
  .route("/")
  .get(asyncHandler(getAvailability))
  .post(asyncHandler(createAvailability));

router
  .route("/:id")
  .put(asyncHandler(updateAvailability))
  .delete(asyncHandler(deleteAvailability));

module.exports = router;
