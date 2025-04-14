const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    duration: {
      type: String,
    },
    children: {
      type: String,
    },
    city: {
      type: String,
    },
    availability: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt alanları otomatik eklenir
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
