const bcrypt = require("bcrypt");
const User = require("../models/users.model");

const passwordMatchs = async function (enterPassword) {
  const password = User;
  return bcrypt.compare(password, enterPassword);
};

module.exports = passwordMatchs;
