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
const documentRoutes = require("./routes/documentRoutes");
const usersRoutes = require("./routes/usersRoutes");
// Eğer başka route’larınız varsa onları da buraya ekleyin:
// const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// ── 0) Disable ETag to prevent 304 Not Modified ─────────────────────────────
app.disable("etag");

// ── 1) Global no-cache headers for all /api routes ─────────────────────────
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// ── 2) CORS middleware ───────────────────────────────────────────────────────
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight için

// ── 3) Body parsers ──────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── 4) Static uploads (profile pics, id cards vb.) ──────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── 5) MongoDB bağlantısı ────────────────────────────────────────────────────
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

// ── 6) Route tanımlamaları ───────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking-requests", bookingRequestRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/babysitters", babysitterRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/babysitter", babysitterRoutes);
app.use("/api/users", usersRoutes);
//app.use("/api/availability", availabilityRoutes);

//app.use("/api/applications",    applicationRoutes); // ihtiyacınıza göre ekleyin

// ── 7) Basit bir health‑check ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

// ── 8) 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ── 9) Global error handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// ── 10) Server başlat ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
