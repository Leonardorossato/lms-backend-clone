const express = require("express");
const router = express.Router();
const passport = require("passport");
// const { generateToken } = require("../middleware/jwt.middleware");
// const User = require("../models/users.model");
const expressAsyncHandler = require("express-async-handler");

router.get(
  "/login/success",
  expressAsyncHandler(async (req, res) => {
    console.log("Success!");
    return res.status(200).json({ message: "Login Sucessfully." });
  })
);

router.get(
  "/login/failed",
  expressAsyncHandler(async (req, res) => {
    return res.status(401).json({ message: "Login Failed" });
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/auth/google/callback",
  expressAsyncHandler(async (req, res) => {
    passport.authenticate("google", {
      successRedirect: "/login/success",
      failureRedirect: "/login/failed",
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
