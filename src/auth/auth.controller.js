const User = require("../models/users.model");

class AuthController {
  static login = async (req, res) => {};

  static register = async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (!user.email) {
        throw new Error("Email not exist. Please try again");
      }
      const userCreate = await User.create(req.body);
      return userCreate;
    } catch (error) {
      throw new Error("Error to create user: ", 404);
    }
  };
}

module.exports = AuthController;
