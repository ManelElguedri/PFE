const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  getJobApplications,
  createJobApplication,
  applyForJob,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");

// /api/job-applications
router
  .route("/")
  .get(asyncHandler(getJobApplications))
  .post(asyncHandler(createJobApplication));

// /api/job-applications/:id
router
  .route("/:id")
  .put(asyncHandler(updateJobApplication))
  .delete(asyncHandler(deleteJobApplication));

// /api/job-applications/:id/apply
router.post("/:id/apply", asyncHandler(applyForJob));

module.exports = router;
