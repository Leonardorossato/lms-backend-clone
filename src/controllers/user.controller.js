const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");
class UserController {
  static update = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .select("-password")
        .lean();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error updating this user" });
    }
  };

  static delete = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error while deleting this user id: ${id}` });
    }
  };
}

module.exports = UserController;
