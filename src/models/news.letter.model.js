const mongoose = require("mongoose");

const newsLettesSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const NewsLetters = mongoose.model("newsLetters", newsLettesSchema);
module.exports = NewsLetters;
