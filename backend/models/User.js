const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "babysitter", "parent"],
      default: "parent",
    },
    age: { type: Number },
    isSmoker: { type: String },
    educationLevel: { type: String },
    babysittingPlace: { type: String },
    babysittingFrequency: { type: String },
    profilePicture: { type: String },
    idCard: { type: String },
    gender: { type: String },
    numberOfChildren: { type: Number },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
