// backend/server.js

require("dotenv").config(); // .env içindeki değişkenleri yükle
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const parentRoutes = require("./routes/parentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const bookingRequestRoutes = require("./routes/bookingRequestRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const babysitterRoutes = require("./routes/babysitterRoutes");

const app = express();

// 1) ETag üretimini kapat (304 yanıtını tamamen önler)
app.disable("etag");

// 2) Tüm /api rotalarında no-cache başlıkları ekle
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// ── 1) CORS MIDDLEWARE ───────────────────────────────────────────────────────
app.use(
  cors({
    origin: "http://localhost:3000", // React uygulamanızın adresi
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // preflight için

// ── 2) BODY PARSER ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── 3) STATIC UPLOADS ────────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── 4) MONGODB BAĞLANTISI ───────────────────────────────────────────────────
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

// ── 5) ROUTE TANIMLAMALARI ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking-requests", bookingRequestRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/babysitters", babysitterRoutes);

// ── 6) HEALTH‑CHECK ─────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

// ── 7) 404 HANDLER ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ── 8) GLOBAL ERROR HANDLER ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// ── 9) SERVER BAŞLAT ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
