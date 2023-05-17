const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = {
    _id: user._id,
    roles: user.roles,
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  return token;
}

const authenticationTokenUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(token, jwtSecret, (err, validateToken) => {
        if (err) {
          res.status(400).json({ message: "Invalid token" });
        } else {
          req.user = validateToken;
        }
        next();
      });
    } catch (error) {
      return res.status(400).json("Not Authorized, Please Login again");
    }
  }
};

const authenticationTokenAdmin = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(token, jwtSecret, (err, validateToken) => {
        if (err) {
          res.status(400).json({ message: "Invalid token" });
        } else {
          req.user = validateToken;
        }
        next();
      });
    } catch (error) {
      return res.status(400).json("Not Authorized, Please Login again");
    }
  }
};

const authenticationTokenInstructor = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ id: decode._id });
        req.user = user;
        return next();
      } else {
        return res
          .status(400)
          .json({ message: "Access Denied. No token provided." });
      }
    } catch (error) {
      return res.status(400).json("Not Authorized, Please Login again");
    }
  }
});

module.exports = {
  authenticationTokenUser,
  generateToken,
  authenticationTokenAdmin,
  authenticationTokenInstructor,
};
