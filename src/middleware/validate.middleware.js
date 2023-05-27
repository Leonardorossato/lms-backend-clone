const mongoose = require("mongoose");

const validObjectId = (id) => {
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (!validId) {
    throw new Error({ message: "Invalid mongoose id" });
  }
};

module.exports = validObjectId;
