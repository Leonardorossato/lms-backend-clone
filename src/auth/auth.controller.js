const { generateToken } = require("../middleware/jwt.middleware");
const passwordMatchs = require("../middleware/password.match");
const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");
class AuthController {
  static login = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user && passwordMatchs(password)) {
        return res.status(200).json({
          token: generateToken(user)
        });
      }
    } catch (error) {
      return res.status(404).json("Email or password not match", error.message);
    }
  });

  static register = asyncHandler(async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      const newUser = await User.create(req.body);
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  });
}

module.exports = AuthController;
