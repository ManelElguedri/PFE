// backend/controllers/bookingRequestController.js
const BookingRequest = require("../models/BookingRequest");
const asyncHandler = require("express-async-handler");

// 1) Booking oluşturma
const createBookingRequest = asyncHandler(async (req, res) => {
  const { babysitterId } = req.body;

  if (!babysitterId) {
    res.status(400);
    throw new Error("Babysitter ID gerekli.");
  }

  const existing = await BookingRequest.findOne({
    parent: req.user._id,
    babysitter: babysitterId,
    status: "pending",
  });

  if (existing) {
    res.status(400);
    throw new Error("Zaten bekleyen bir isteğiniz var.");
  }

  const booking = await BookingRequest.create({
    parent: req.user._id,
    babysitter: babysitterId,
  });

  res.status(201).json(booking);
});

// 2) Babysitter booking isteklerini görür
const getBabysitterBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingRequest.find({ babysitter: req.user._id })
    .populate("parent", "name email")
    .sort({ date: -1 });

  res.json(bookings);
});

// 3) Kabul/Reddet
const respondBookingRequest = asyncHandler(async (req, res) => {
  const booking = await BookingRequest.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking bulunamadı");
  }

  if (booking.babysitter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Yetkisiz işlem");
  }

  const { action } = req.body;
  if (!["accepted", "declined"].includes(action)) {
    res.status(400);
    throw new Error("Geçersiz yanıt");
  }

  booking.status = action;
  await booking.save();
  res.json(booking);
});

// 🔥 En önemli yer burası
module.exports = {
  createBookingRequest,
  getBabysitterBookings,
  respondBookingRequest,
};
