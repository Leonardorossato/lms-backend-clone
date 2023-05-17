const mongoose = require("mongoose");

const validObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid mongoose id" });
  }
  next();
};

module.exports =  validObjectId ;
