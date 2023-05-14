const validObjectId = require("../middleware/validate.middleware");
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

  static update = async (req, res) => {
    const { _id } = req.user;
    validObjectId(_id);
    try {
      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error updating this user" });
    }
  };
}

module.exports = UserController;
