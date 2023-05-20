const { default: mongoose } = require("mongoose");

const tutorialCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    image: {
      type: String,
      default:
        "https://www.google.com.br/url?sa=i&url=http%3A%2F%2Fwww.brasillocacao.com.br%2Fcategory%2Fdefault%2F&psig=AOvVaw0RyuJG6OSEKnYtTWT8ATtG&ust=1684677954776000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLipxcqIhP8CFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const TutorialCategory = mongoose.model(
  "tutorialCategory",
  tutorialCategorySchema
);
module.exports = TutorialCategory;
