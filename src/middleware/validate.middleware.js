const mongoose = require("mongoose");

const validObjectId = (id) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if (!isIdValid) {
    console.log({ message: "Invalid mongoose id" });
  }
};

module.exports = validObjectId;
