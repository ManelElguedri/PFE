const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const {
  getDocuments,
  createDocument,
  deleteDocument,
} = require("../controllers/documentController");

router.use(protect);

router
  .route("/")
  .get(asyncHandler(getDocuments))
  .post(asyncHandler(createDocument));

router.route("/:id").delete(asyncHandler(deleteDocument));

module.exports = router;
