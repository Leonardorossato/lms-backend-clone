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

  static findAll = async (req, res) => {};

  static findOne = async (req, res) => {};

  static update = async (req, res) => {};

  static delete = async (req, res) => {};
}

module.exports = ReviewController;
