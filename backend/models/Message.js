// backend/models/Message.js

const mongoose = require("mongoose"); // ← mongoose'u mutlaka import edin

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Veya "Parent"/"Babysitter" modeline göre değiştirin
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Veya "Parent"/"Babysitter"
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanları otomatik eklenir
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
