const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    thumbnail: {
      type: String,
      default:
        "https://www.google.com.br/url?sa=i&url=http%3A%2F%2Fwww.brasillocacao.com.br%2Fcategory%2Fdefault%2F&psig=AOvVaw0RyuJG6OSEKnYtTWT8ATtG&ust=1684677954776000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLipxcqIhP8CFQAAAAAdAAAAABAE",
    },
    description: { type: String, required: true },
    video_url: { type: String, required: true },
    keywords: { type: [], required: false },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", videoSchema);
module.exports = Video;
