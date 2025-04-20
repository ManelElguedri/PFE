const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private (admin or babysitter)
const getApplications = asyncHandler(async (req, res) => {
  const apps = await Application.find()
    .populate("babysitter", "name email") // babysitter adı ve e‑postası
    .populate("announcement", "title date"); // duyuru başlığı ve tarihi
  res.json(apps);
});

// @desc    Create new application
// @route   POST /api/applications
// @access  Private (babysitter)
const createApplication = asyncHandler(async (req, res) => {
  const { babysitter, announcement } = req.body;
  if (!babysitter || !announcement) {
    res.status(400);
    throw new Error("babysitter ve announcement ID’leri gerekli");
  }
  const app = await Application.create({ babysitter, announcement });
  res.status(201).json(app);
});

module.exports = {
  getApplications,
  createApplication,
};
