const { default: slugify } = require("slugify");
const TutorialCategory = require("../models/tutorial.category.model");

class TutorialCategoryController {
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

  static findOne = async (req, res) => {
    try {
      const category = await TutorialCategory.findById(req.params.id);
      if (!category) {
        return res
          .status(404)
          .json({ message: "TutorialCategory id not found" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: "Error category not found " });
    }
  };

  static update = async (req, res) => {
    try {
      const {id} = req.params;
      const category = await TutorialCategory.findById(id);
      if (!category._id) {
        return res
          .status(404)
          .json({ message: "TutorialCategory id not found" });
      }
      await TutorialCategory.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Tutorial Category updated successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error to update tutorial category" });
    }
  };

  static delete = async (req, res) => {
    try {
      const category = await TutorialCategory.findById(req.params.id);
      if (!category) {
        return res
          .status(404)
          .json({ message: "TutorialCategory id not found" });
      }
      await TutorialCategory.findByIdAndDelete(category);
      return res
        .status(200)
        .json({ message: "TutorialCategory deleted successfully." });
    } catch (error) {
      return res
        .status(403)
        .json({ message: `Error to delete tutorial category with id` });
    }
  };
}

module.exports = TutorialCategoryController;
