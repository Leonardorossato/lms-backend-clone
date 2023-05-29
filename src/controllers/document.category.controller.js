const DocumentCategory = require("../models/document.category.model");

class DocumentCategoryController {
  static create = async (req, res) => {
    try {
      const documentCategory = await DocumentCategory.create(req.body);
      await documentCategory.save();
      return res.status(201).json(documentCategory);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error creating a Category for this Document." });
    }
  };

  static findAll = async (req, res) => {
    try {
      const documentCategory = await DocumentCategory.find();
      return res.status(200).json(documentCategory);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all documents" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const documentCategory = await DocumentCategory.findById(id);
      return res.status(200).json(documentCategory);
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
      await DocumentCategory.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Document updated successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error updating this Category for this document" });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      await DocumentCategory.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Document Category deleted successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error deleting this Document Category." });
    }
  };
}

module.exports = DocumentCategoryController;
