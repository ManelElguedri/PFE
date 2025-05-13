const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

// Parent/Babysitter mesaj gönderir
const sendMessage = asyncHandler(async (req, res) => {
  const { to, text } = req.body;
  const from = req.user._id;

  const message = await Message.create({ from, to, text });
  res.status(201).json(message);
});

// İki kullanıcı arasındaki tüm mesajları getir
const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [
      { from: req.user._id, to: userId },
      { from: userId, to: req.user._id },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json(messages);
});

module.exports = { sendMessage, getMessages };
