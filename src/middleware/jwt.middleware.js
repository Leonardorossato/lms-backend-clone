const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret);
};

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization.startswith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decode = jwt.verify(token, jwtSecret);
          const user = await User.findById(decode._id);
          request.user = user;
          next();
        } else {
          return res.status(403).json("There is no token in header");
        }
      } catch (error) {
        return res
          .status(400)
          .json("Not Authorized, Please Login again", error.message);
      }
    }
  } catch (error) {
    return res.status(400).json("Invalid token", error.message);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.user;
    const isAdmin = await User.findOne({ email: email });
    if (isAdmin.roles !== "admin") {
      return res.status(403).json("You are not admin");
    } else next();
  } catch (error) {
    return res.status(404).json("Error in user permission", error);
  }
};

const isInstructor = async (req, res, next) => {
  try {
    const { email } = req.user;
    const isAdmin = await User.findOne({ email: email });
    if (isAdmin.roles !== "instructor") {
      return res.status(403).json("You are not Instructor");
    } else next();
  } catch (error) {
    return res.status(404).json("Error in user permission", error);
  }
};

module.exports = { generateToken, authMiddleware, isAdmin, isInstructor };
