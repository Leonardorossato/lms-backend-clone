const passport = require("passport");
const GoogleStratey = require("passport-google-oauth20").Strategy;
const User = require("../models/users.model");
require("dotenv").config();
const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

passport.use(
  new GoogleStratey(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (profile, cb) {
      let data = profile?._json;
      const user = await User.findOne({ email: data.email });
      if (user) {
        return cb(null, profile);
      }else{
        const newUser = await User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        })
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
