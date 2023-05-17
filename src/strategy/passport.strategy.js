const passport = require("passport");
const googleStratey = require("passport-google-oauth20").Strategy;
const User = require("../models/users.model");

passport.use(
  new googleStratey(
    {
      clientId: "",
      clientSecret: "",
      callbackUrl: "",
      scope: ["profile", "email"],
    },
    async function (profile, done) {
      console.log(profile);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
