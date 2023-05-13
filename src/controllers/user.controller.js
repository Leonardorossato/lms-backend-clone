const User = require("../models/users.model");

class UserController {
  static findAll = async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json("Error to find all users", error.message);
    }
  };
}

module.exports = UserController;
