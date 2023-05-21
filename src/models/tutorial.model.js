const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true, index: true },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: { type: String, index: true },
    topicName: { type: String, required: true },
    content: { type: String, required: true },
    keywords: { type: [], required: true },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
module.exports = Tutorial;
