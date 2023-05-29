const mongoose = require("mongoose");

const documentCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const DocumentCategory = mongoose.model(
  "documentCategory",
  documentCategorySchema
);
module.exports = DocumentCategory;
