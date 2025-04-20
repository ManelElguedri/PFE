// backend/routes/jobApplicationRoutes.js

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const {
  getJobApplications,
  createJobApplication,
  applyForJob,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");

// GET  /api/job-applications       → tüm başvuruları getir
// POST /api/job-applications       → yeni başvuru oluştur
router
  .route("/")
  .get(asyncHandler(getJobApplications))
  .post(protect, asyncHandler(createJobApplication));

// PUT    /api/job-applications/:id → başvuruyu güncelle
// DELETE /api/job-applications/:id → başvuruyu sil
router
  .route("/:id")
  .put(protect, asyncHandler(updateJobApplication))
  .delete(protect, asyncHandler(deleteJobApplication));

// POST   /api/job-applications/:id/apply → belirli ilana başvur
router.post("/:id/apply", protect, asyncHandler(applyForJob));

module.exports = router;
