const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const crypto = require("crypto");

const passwordMatchs = async function (enterPassword) {
  const password = User;
  return bcrypt.compare(password, enterPassword);
};

const createPasswordResetToken = async function () {
  const passwordResetToken = User;
  const passwordResetExpires = User;
  const resetToken = crypto.randomBytes(32).toString("hex");
  passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = { passwordMatchs, createPasswordResetToken };
