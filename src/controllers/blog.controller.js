const validObjectId = require("../middleware/validate.middleware");
const Blog = require("../models/blog.model");

class BlogController {
  static create = async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      await blog.save();
      return res.status(201).json(blog);
    } catch (error) {
      return res.status(400).json({ message: "Error creating a Blog." });
    }
  };

  static findAll = async (req, res) => {
    try {
      const blog = await Blog.find();
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all Blogs" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      return res.status(200).json(blog);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find one blog with this id" });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      await Blog.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Blog updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error updating a Blog." });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      await Blog.findByIdAndDelete(id);
      return res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error deleting this Blog" });
    }
  };
}

module.exports = BlogController;
