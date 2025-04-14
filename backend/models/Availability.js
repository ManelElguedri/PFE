// backend/models/Availability.js

const mongoose = require("mongoose"); // ← mongoose’u import et!

const availabilitySchema = new mongoose.Schema(
  {
    babysitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Babysitter",
      required: true,
    },
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
