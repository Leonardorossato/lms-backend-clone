const expressAsyncHandler = require("express-async-handler");
const validObjectId = require("../middleware/validate.middleware");
const Contact = require("../models/contact.model");

class ContactController {
  static create = expressAsyncHandler(async (req, res) => {
    try {
      const contact = await Contact.create(req.body);
      await contact.save();
      return res.status(200).json(contact);
    } catch (error) {
      return res.status(400).json({ message: "Error creating a new contact" });
    }
  });

  static findAll = async (req, res) => {
    try {
      const review = await Contact.find();
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all contact" });
    }
  };

  static findOne = async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Contact.findById(id);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(400).json({ message: "Error to find this contact" });
    }
  };

  static updateContactStatus = async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndUpdate(
        id,
        { status: req.body.status },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Update contact status successfully." });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      await Contact.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted contact successfully." });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Error in deleted this contact." });
    }
  };
}

module.exports = ContactController;
