// backend/controllers/authController.js

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, surname, email, phone, password, role } = req.body;

  // Zorunlu alan kontrolü
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Name, email, password ve role zorunludur");
  }

  // E-posta zaten kayıtlı mı?
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Şifreyi hash’le
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Yeni kullanıcı yarat
  const user = await User.create({
    name,
    surname,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // JWT token üret
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Başarılı yanıt: hem token, hem kullanıcı bilgisi dön
  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı bul
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Şifreyi doğrula
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // JWT token üret
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Başarılı yanıt: token ve user objesi
  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = { register, login };
