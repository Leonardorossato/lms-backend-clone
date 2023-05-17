const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateToken } = require("../middleware/jwt.middleware");
const User = require("../models/users.model");
const expressAsyncHandler = require("express-async-handler");

router.get(
  "/login/success",
  expressAsyncHandler(async (req, res) => {})
);

router.get(
  "/login/failed",
  expressAsyncHandler(async (req, res) => {})
);

router.get(
  "/google",
  expressAsyncHandler(async (req, res) => {
    await passport.authenticate("google", ["profile", "email"]);
  })
);

router.get(
  "/auth/google/callback",
  expressAsyncHandler(async (req, res) => {
    await passport.authenticate("google", {
      successRedirect: "/login/success",
      failureMessage: "/login/failed",
    });
  })
);

router.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    req.logOut();
    res.redirect("/");
  })
);

module.exports = router;
