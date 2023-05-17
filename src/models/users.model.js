const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userImage: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    roles: { type: String, default: "user", required: false },
    isBlocked: { type: Boolean, default: false },
    profession: { type: String, required: true },
    passwordChangeAt: { type: Date, required: false },
    passwordResetToken: { type: String, required: false },
    passwordResetExpires: { type: Date, required: false },
    stripeAccountId: { type: String, required: false },
    stripeSeller: { type: String, required: false },
    stripeSessions: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next)  {
  if(!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
