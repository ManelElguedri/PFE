const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    babysitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement", // Announcement modelinin adı
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Applied", "Accepted", "Declined"],
      default: "Applied",
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
