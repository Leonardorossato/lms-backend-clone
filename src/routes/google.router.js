const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateToken } = require("../middleware/jwt.middleware");
const User = require("../models/users.model");
const expressAsyncHandler = require("express-async-handler");

router.get("/login/success", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      return res.status(200).json({ token: generateToken(user._id), from: "google" });
    } else {
      return res.status(401).json({ message: "Error in generate this token" });
    }
  }
  return res.status(404).json({ error: "Error login with this email address" });
});

router.get("/login/failed", async (req, res) => {
  res.status(401).json({ message: "Login Failed" });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", async (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
