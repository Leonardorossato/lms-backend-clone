const expressAsyncHandler = require("express-async-handler");
const Review = require("../models/review.model");
const validObjectId = require("../middleware/validate.middleware");

class ReviewController {
  static create = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    validObjectId(_id);
    try {
      let data = {
        user: _id,
        comment: req.body.comment,
        color: req.body.color,
      };
      const review = await Review.create(data);
      await review.save();
      return res.status(200).json(review);
    } catch (error) {
      return res.status(400).json({ message: "Error creating a user review" });
    }
  });

  static findAll = async (req, res) => {
    try {
      const review = await Review.find();
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all reviews" });
    }
  };

  static findOne = async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(400).json({ message: "Error to find this review" });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id);
      if (!review.id) {
        return res
          .status(404)
          .json({ message: "Error to find this review id" });
      }
      await Review.findByIdAndUpdate(review);
      return res.status(200).json({ message: "Deleted review successfully." });
    } catch (error) {}
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id);
      if (!review.id) {
        return res
          .status(404)
          .json({ message: "Error to find this review id" });
      }
      await Review.findByIdAndDelete(review);
      return res.status(200).json({ message: "Deleted review successfully." });
    } catch (error) {
      return res.status(404).json({ message: "Error in deleted this review." });
    }
  };
}

module.exports = ReviewController;
