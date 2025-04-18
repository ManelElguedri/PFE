// scripts/createAdmin.js
//require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); 

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"), // __dirname = backend/scripts
});

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const exists = await User.findOne({ email: "admin@example.com" });
    if (exists) {
      console.log("🚫 admin@example.com alredy exists");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("admin123", salt);

    const admin = new User({
      name: "Site Admin",
      surname: "Root",
      email: "admin@example.com",
      phone: "555-0000",
      password: hash,
      role: "admin",
    });
    await admin.save();

    console.log("✅ Admin user has been created", admin.email);
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

run();
