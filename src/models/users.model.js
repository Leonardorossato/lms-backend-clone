const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userImage: {
    type: String,
    defaul:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, default: "(11)99637-5994" },
  roles: { type: String, default: "user" },
  isBlocked: { type: Boolean, default: false },
  profession: { type: String, required: true },
  passwordChangeAt: { type: Date },
  passwordResetToken: String,
  passwordResetExpires: Date,
  stripeAccountId: { type: String },
  stripeSeller: { type: String },
  stripeSessions: { type: String },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
