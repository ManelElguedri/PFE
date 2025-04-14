const asyncHandler = require("express-async-handler");
const JobApplication = require("../models/JobApplication");

// GET /api/job-applications
exports.getJobApplications = asyncHandler(async (req, res) => {
  const jobs = await JobApplication.find({});
  res.json(jobs);
});

// POST /api/job-applications
// (Eğer yeni ilan eklemek isterseniz)
exports.createJobApplication = asyncHandler(async (req, res) => {
  const newJob = await JobApplication.create(req.body);
  res.status(201).json(newJob);
});

// POST /api/job-applications/:id/apply
exports.applyForJob = asyncHandler(async (req, res) => {
  const job = await JobApplication.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  job.status = "Applied";
  await job.save();
  res.json({ message: "Application successful", job });
});

// PUT /api/job-applications/:id
exports.updateJobApplication = asyncHandler(async (req, res) => {
  const updated = await JobApplication.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) {
    res.status(404);
    throw new Error("Job not found");
  }
  res.json(updated);
});

// DELETE /api/job-applications/:id
exports.deleteJobApplication = asyncHandler(async (req, res) => {
  const job = await JobApplication.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  await job.remove();
  res.status(204).end();
});
