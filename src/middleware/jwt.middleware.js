const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret);
};

const authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (!token) {
        return res.status(400).json({ message: "Access Denied. No token provided." });
      } else {
        const decode = jwt.verify(token, jwtSecret);
        const user = await User.findById(decode._id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res
        .status(400)
        .json("Not Authorized, Please Login again", error.message);
    }
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
