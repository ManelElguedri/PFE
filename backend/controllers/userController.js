const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Get all users (for select box)
// @route   GET /api/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  // Dilerseniz burada rol filtresi koyabilirsiniz:
  // örneğin yalnızca diğer roller (parent <-> babysitter) gelsin
  const users = await User.find({}).select("_id name email role").lean();
  res.json(users);
});
