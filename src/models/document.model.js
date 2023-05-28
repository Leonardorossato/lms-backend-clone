const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    author: {
      type: String,
      default: "Developer",
    },
    type: { type: String, required: true },
    content: { type: String, required: true },
    keywords: { type: [], required: false },
    doc_image: {
      type: String,
      default:
        "https://www.google.com.br/url?sa=i&url=http%3A%2F%2Fwww.brasillocacao.com.br%2Fcategory%2Fdefault%2F&psig=AOvVaw0RyuJG6OSEKnYtTWT8ATtG&ust=1684677954776000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLipxcqIhP8CFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("document", documentSchema);
module.exports = Document;
