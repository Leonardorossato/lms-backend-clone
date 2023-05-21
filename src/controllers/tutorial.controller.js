const slugify = require("slugify");
const Tutorial = require("../models/tutorial.model");

class TutorialController {
  static create = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.tutorialCategory) {
        req.body.tutorialCategorySlug = slugify(
          req.body.tutorialCategory.toLowerCase()
        );
      }
      const post = await Tutorial.create(req.body);
      await post.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json({ message: "Error creating a tutorial" });
    }
  };
  static findAll = async (req, res) => {
    try {
      const tutorial = await Tutorial.find();
      return res.status(200).json(tutorial);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all tutorials" });
    }
  };

  static getTutorial = async (req, res) => {
    try {
      const { slug, type } = req.params;
      const getTutorial = await Tutorial.find({
        slug: slug,
        tutorialCategory: type,
      });
      const topics = await Tutorial.find({ tutorialCategory: true })
        .select("topicName title tutorialCategory")
        .sort("createdAt");
      return response.status(200).json({ topics, getTutorial });
    } catch (error) {
      return response.status(500).json({ message: "Error to get tutorial" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(404)
          .json({ message: `Error to find tutorial with this id: ${id}` });
      }
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.tutorialCategory) {
        req.body.tutorialCategorySlug = slugify(
          req.body.tutorialCategory.toLowerCase()
        );
      }
      await Tutorial.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Tutorial updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error updating tutorial" });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(404)
          .json({ message: `Error to find tutorial with this id: ${id}` });
      }
      await Tutorial.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Tutorial deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error while deleting tutorial" });
    }
  };
}
module.exports = TutorialController;
