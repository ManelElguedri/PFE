// backend/routes/parentRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Controller fonksiyonlarını import et
const {
  getParents,
  createParent,
  updateParent,
  deleteParent,
} = require("../controllers/parentController");

// /api/parents
router
  .route("/")
  .get(asyncHandler(getParents))
  .post(asyncHandler(createParent));

router
  .route("/:id")
  .put(asyncHandler(updateParent))
  .delete(asyncHandler(deleteParent));

module.exports = router;
