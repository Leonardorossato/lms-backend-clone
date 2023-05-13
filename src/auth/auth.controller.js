const User = require("../models/users.model");

class AuthController {
  static login = async (req, res) => {};

  static register = async (req, res) => {
    try {
      const email = req.body.email;
      await User.findOne({ email: email });
      const userCreate = await User.create(req.body);
      return res.status(201).json(userCreate);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
}

module.exports = AuthController;
