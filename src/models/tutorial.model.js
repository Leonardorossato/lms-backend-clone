const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true, indexed: true },
  tutorialCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tutorialCategory",
    required: true,
  },
  topicName: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  keywords: { type: [], required: true },
});

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
module.exports = Tutorial;
