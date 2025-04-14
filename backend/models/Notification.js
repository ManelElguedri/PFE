// backend/models/Notification.js

const mongoose = require("mongoose"); // ← mongoose’u mutlaka import edin

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Veya projenizdeki uygun model adı: "Parent" / "Babysitter"
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    // Opsiyonel olarak tür bilgisi ekleyebilirsiniz:
    // type: { type: String, enum: ["booking", "message", "system"], default: "system" },
  },
  {
    timestamps: true, // createdAt, updatedAt otomatik eklenir
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
