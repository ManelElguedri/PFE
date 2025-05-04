const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/userController");

router.get("/", protect, asyncHandler(getUsers));

module.exports = router;
