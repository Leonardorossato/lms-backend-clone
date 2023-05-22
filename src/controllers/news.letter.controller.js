const NewsLetters = require("../models/news.letter.model");

class NewsLettersController {
  static subscribe = async (req, res) => {
    try {
      const email = await NewsLetters.create(req.body);
      await email.save();
      return res.status(201).json(email);
    } catch (error) {
      return res.status(500).json({ message: "Error in emal." });
    }
  };

  static unsubscribe = async (req, res) => {
    try {
      const { id } = req.params;
      await NewsLetters.findByIdAndDelete(id);
      return res.status(200).json({ message: "Unsubscribre Successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in unsubscribe your email" });
    }
  };
}

module.exports = NewsLettersController;
