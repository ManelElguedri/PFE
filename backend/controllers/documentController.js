const asyncHandler = require("express-async-handler");
const Document = require("../models/Document");

// @desc    Get all documents for current user
// @route   GET /api/documents
// @access  Private
// exports.getDocuments = asyncHandler(async (req, res) => {
//   const docs = await Document.find({ user: req.user._id }).select("-__v");
//   res.status(200).json(docs);
// });

exports.getDocuments = asyncHandler(async (req, res) => {
  let docs;
  if (req.user.role === "admin") {
    // admin isen tüm dökümanları al
    docs = await Document.find({});
  } else {
    // parent veya babysitter isen sadece kendine ait olanları al
    docs = await Document.find({ user: req.user._id });
  }
  res.status(200).json(docs);
});

// @desc    Upload a new document
// @route   POST /api/documents
// @access  Private
exports.createDocument = asyncHandler(async (req, res) => {
  const { name, url, type } = req.body;
  if (!name || !url || !type) {
    res.status(400);
    throw new Error("name, url and type are required");
  }
  const doc = await Document.create({
    user: req.user._id,
    name,
    url,
    type,
  });
  res.status(201).json(doc);
});

// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private
exports.deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) {
    res.status(404);
    throw new Error("Document not found");
  }
  if (doc.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this document");
  }
  await doc.remove();
  res.status(204).end();
});
