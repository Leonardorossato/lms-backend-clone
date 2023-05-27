const expressAsyncHandler = require("express-async-handler");
const passwordMatchs = require("../middleware/password.match");
const User = require("../models/users.model");
const { generateToken } = require("../middleware/jwt.middleware");

class AuthController {
  static login = expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(403).json({ message: "Invalid email address" });
      }
      if (!user && !passwordMatchs(password)) {
        return res.status(403).json({ message: "Invalid password" });
      }
      let token = generateToken(user);
      return res.status(201).json({ token: token, roles: user.roles });
    } catch (error) {
      return res.status(404).json({ message: "Email or password not match" });
    }
  });

  static register = async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      const newUser = await User.create(req.body);
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
}

module.exports = AuthController;
