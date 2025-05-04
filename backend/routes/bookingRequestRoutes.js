const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
const {
  getBookingRequests,
  createBookingRequest,
  updateBookingRequest,
  deleteBookingRequest,
} = require("../controllers/bookingRequestController");

const router = express.Router();

// Tüm istekler için önce protect
router.use(protect);

router
  .route("/")
  .get(asyncHandler(getBookingRequests))
  .post(asyncHandler(createBookingRequest));

router
  .route("/:id")
  .put(asyncHandler(updateBookingRequest))
  .delete(asyncHandler(deleteBookingRequest));

module.exports = router;
