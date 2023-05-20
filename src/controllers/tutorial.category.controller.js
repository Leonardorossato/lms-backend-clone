const { default: slugify } = require("slugify");
const TutorialCategory = require("../models/tutorial.category.schema");

class TutorialCategoryController {
  static findAll = async (req, res) => {
    try {
      const category = await TutorialCategory.find();
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find all TutorialCategory" });
    }
  };

  static createTutorialCategory = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const post = await TutorialCategory.create(req.body);
      await post.save();
      return res.status(201).json(post);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating tutorial category" });
    }
  };
}

module.exports = TutorialCategoryController;
