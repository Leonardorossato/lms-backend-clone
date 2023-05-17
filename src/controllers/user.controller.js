const User = require("../models/users.model");
const {
  passwordMatchs,
  createPasswordResetToken,
} = require("../middleware/password.match");
require("dotenv").config();
const PORT = process.env.PORT;
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

  static updatePassword = async (req, res) => {
    try {
      const { password } = req.body;
      const user = await User.findById(req.params.id);
      if (user && (await passwordMatchs(password))) {
        return res.status(400).json({
          message: "Please provide a new password instead of the old one.",
        });
      } else {
        user.password = password;
        await user.save();
        return res
          .status(200)
          .json({ message: "Password update successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating password" });
    }
  };

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not exist with this email." });
      }
      const token = await createPasswordResetToken();
      await user.save();
      const resetLink = `http://localhost:${PORT}/api/users/reset-password/${token}`;
      return res.status(200).json({ message: resetLink });
    } catch (error) {}
  };
}

module.exports = UserController;
