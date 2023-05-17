const User = require("../models/users.model");
const passwordMatchs = require("../middleware/password.match");
require("dotenv").config();
const PORT = process.env.PORT;
const crypto = require("crypto");

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
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetLink = `http://localhost:${PORT}/api/users/reset-password/${token}`;
      return res.status(200).json({ message: resetLink });
    } catch (error) {
      return res.status(500).json({ message: "Invalid email address" });
    }
  };

  static resetPassword = async (req, res) => {
    try {
      const { password } = req.body;
      let { token } = req.params;
      let hashToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(500).json({ message: "Token Expired. Try again" });
      }
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(200).json({ message: "Password Reset Successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error in updating password" });
    }
  };
}

module.exports = UserController;
