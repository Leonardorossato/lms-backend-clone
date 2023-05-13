const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

const mongoConnection = () => {
  try {
    const connection = mongoose.connect(mongoURL);
    console.log("Connection with Mongo Databse was successfuly.");
    return connection;
  } catch (error) {
    throw new Error("Could not connect to this Mongo Database", error);
  }
};

module.exports = mongoConnection;
