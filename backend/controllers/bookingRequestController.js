// backend/controllers/bookingRequestController.js
const asyncHandler = require("express-async-handler");
const BookingRequest = require("../models/BookingRequest");
const Notification = require("../models/Notification");
const User = require("../models/User");

// 1. Booking oluştur (Parent → Babysitter)
const createBookingRequest = asyncHandler(async (req, res) => {
  const { babysitterId } = req.body;

  if (!babysitterId) {
    res.status(400);
    throw new Error("Babysitter ID gerekli.");
  }

  // Daha önce bekleyen bir istek var mı?
  const alreadyExists = await BookingRequest.findOne({
    parent: req.user._id,
    babysitter: babysitterId,
    status: "pending",
  });

  if (alreadyExists) {
    res.status(400);
    throw new Error("Zaten bekleyen bir isteğiniz var.");
  }

  const newBooking = await BookingRequest.create({
    parent: req.user._id,
    babysitter: babysitterId,
    status: "pending",
  });

  // Parent adını al (bildirimde göstermek için)
  const parentUser = await User.findById(req.user._id);

  // Babysitter'a bildirim oluştur
  await Notification.create({
    user: babysitterId,
    message: `You received a booking request from ${
      parentUser?.name || "a parent"
    }.`,
    type: "booking",
    isRead: false,
  });

  res.status(201).json(newBooking);
});

// 2. Babysitter gelen booking isteklerini görür
const getBabysitterBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingRequest.find({ babysitter: req.user._id })
    .populate("parent", "name email")
    .sort({ createdAt: -1 });

  res.json(bookings);
});

// 3. Babysitter booking isteğini kabul/reddeder
const respondBookingRequest = asyncHandler(async (req, res) => {
  const { action } = req.body;
  const booking = await BookingRequest.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking bulunamadı.");
  }

  if (booking.babysitter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Bu işlem için yetkiniz yok.");
  }

  if (!["accepted", "declined"].includes(action)) {
    res.status(400);
    throw new Error("Yanıt yalnızca 'accepted' veya 'declined' olabilir.");
  }

  booking.status = action;
  await booking.save();

  // Parent'a yanıt bildirimi gönder
  await Notification.create({
    user: booking.parent,
    message: `Your booking request was ${action} by the babysitter.`,
    type: "booking",
    isRead: false,
  });

  res.json(booking);
});

module.exports = {
  createBookingRequest,
  getBabysitterBookings,
  respondBookingRequest,
};
