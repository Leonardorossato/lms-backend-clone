const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

const authMiddlewareToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Not Authorized, Please Login again" });
    }
  } else {
    return res.status(403).json({ message: "There is no token in header" });
  }
});

const isAdminToken = expressAsyncHandler(async (req, res, next) => {
  let { email } = req.user;
  try {
    const isAdmin = await User.findOne({ email: email });
    if (isAdmin.roles !== "admin") {
      return res.status(401).json({ message: "You are not Admin." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Error invalid token" });
  }
});

module.exports = {
  generateToken,
  authMiddlewareToken,
  isAdminToken,
};
