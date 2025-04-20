const asyncHandler = require("express-async-handler");
const JobApplication = require("../models/JobApplication");

// @desc    Get all job applications
// @route   GET /api/job-applications
// @access  Public (veya protect ile Private yapabilirsiniz)
exports.getJobApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find({})
    .populate("babysitter", "name email") // Kullanıcı adı/email
    .populate("announcement", "title date startTime endTime parentName"); // İlan detayları
  res.status(200).json(applications);
});

// @desc    Create a new job application
// @route   POST /api/job-applications
// @access  Private
exports.createJobApplication = asyncHandler(async (req, res) => {
  const { babysitter, announcement } = req.body;
  if (!babysitter || !announcement) {
    res.status(400);
    throw new Error("Both babysitter and announcement IDs are required");
  }

  // Aynı ilana tekrar başvuru engeli
  const exists = await JobApplication.findOne({ babysitter, announcement });
  if (exists) {
    res.status(400);
    throw new Error("You have already applied for this job");
  }

  const application = await JobApplication.create({ babysitter, announcement });
  res.status(201).json(application);
});

// @desc    Update an existing job application
// @route   PUT /api/job-applications/:id
// @access  Private
exports.updateJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  // İstediğin alanları güncelle
  Object.assign(application, req.body);
  await application.save();

  res.status(200).json(application);
});

// @desc    Delete a job application
// @route   DELETE /api/job-applications/:id
// @access  Private
exports.deleteJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  await application.remove();
  res.status(204).end();
});
