const validObjectId = require("../middleware/validate.middleware");
const Review = require("../models/review.model");

class ReviewController {
  static create = async (req, res) => {
    const { _id } = req.user;
    try {
      validObjectId(_id);
      let data = {
        user: _id,
        comment: req.body.comment,
        color: req.body.color,
      };
      const review = await Review.create(data);
      await review.save();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: "Error creating a user review" });
    }
  };

  static findAll = async (req, res) => {};

  static findOne = async (req, res) => {};

  static update = async (req, res) => {};

  static delete = async (req, res) => {};
}

module.exports = ReviewController;
