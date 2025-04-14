// backend/server.js

require("dotenv").config(); // .env’i yükle
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const parentRoutes = require("./routes/parentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const bookingRequestRoutes = require("./routes/bookingRequestRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const babysitterRoutes = require("./routes/babysitterRoutes");
const authRoutes = require("./routes/authRoutes"); // eğer varsa

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // CORS izinleri
app.use(express.json()); // JSON body parser

// --- MONGODB BAĞLANTISI ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- ROUTES ---
app.use("/api/parents", parentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking-requests", bookingRequestRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/babysitters", babysitterRoutes);
app.use("/api/auth", authRoutes); // eğer authRoutes oluşturduysanız

// Basit bir health‑check
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

// --- 404 MIDDLEWARE ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// --- GENEL HATA MIDDLEWARE ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// --- SERVER BAŞLAT ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
