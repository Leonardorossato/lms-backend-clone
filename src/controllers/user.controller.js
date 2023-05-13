const User = require("../models/users.model");

class UserController {
  static findAll = async () => {
    try {
      const user = await User.find();
      return user;
    } catch (error) {
      throw new Error("Error to find all users", error.message);
    }
  };
}

module.exports = UserController;
