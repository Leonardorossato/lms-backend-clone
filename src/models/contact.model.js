const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    subject: { type: String, required: true },
    profession: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("ontact", contactSchema);
module.exports = Contact;
