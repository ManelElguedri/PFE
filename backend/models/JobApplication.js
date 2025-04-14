// backend/models/JobApplication.js

const mongoose = require("mongoose"); // ← mongoose'u mutlaka import edin

const jobApplicationSchema = new mongoose.Schema(
  {
    babysitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Babysitter",
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Applied", "Accepted", "Declined"],
      default: "Applied",
    },
  },
  {
    timestamps: true, // createdAt / updatedAt otomatik eklenir
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
