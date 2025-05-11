const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  babysitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
