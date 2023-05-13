const generateToken = require("../middleware/jwt.middleware");
const passwordMatchs = require("../middleware/password.match");
const User = require("../models/users.model");

class AuthController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user && passwordMatchs(password)) {
        return res
          .status(200)
          .json({ access_token: generateToken(user._id), role: user?.roles });
      }
    } catch (error) {
      return res.status(404).json("Email or password not match", error.message);
    }
  };

  static register = async (req, res) => {
    try {
      const email = req.body.email;
      await User.findOne({ email: email });
      const userCreate = await User.create(req.body);
      return res.status(201).json(userCreate);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
}

module.exports = AuthController;
