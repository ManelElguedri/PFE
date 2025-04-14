// backend/models/BookingRequest.js

const mongoose = require("mongoose"); // ← mongoose'u mutlaka import et

const bookingRequestSchema = new mongoose.Schema(
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
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt alanları eklenir
  }
);

const BookingRequest = mongoose.model("BookingRequest", bookingRequestSchema);

module.exports = BookingRequest;
