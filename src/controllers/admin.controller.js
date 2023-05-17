const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");

class AdminController {
  static findAll = asyncHandler(async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json("Error to find all users", error.message);
    }
  });

  static findOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json("User not exist in Database", error.message);
    }
  });

  static blockedUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true }
      );
      return res.status(200).json({ message: "User blocked successfully." });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

  static unblockedUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "User unblocked successfully.", user });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });
}

module.exports = AdminController;
