const slugify = require("slugify");
const validObjectId = require("../middleware/validate.middleware");
const Document = require("../models/document.model");

class DocumentController {
  static create = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const document = await Document.create(req.body);
      await document.save();
      return res.status(201).json(document);
    } catch (error) {
      return res.status(400).json({ message: "Error creating video" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const document = await Document.find();
      return res.status(200).json(document);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all documents" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Document.findById(id);
      return res.status(200).json(video);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to a document with this id" });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      await Document.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Document updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error updating this document" });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      await Document.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Document deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error deleting this document." });
    }
  };
}

module.exports = DocumentController;
