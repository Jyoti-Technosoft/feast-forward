const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  contactUsId: { type: String },
  contactType: {
    type: String,
    required: false, // change to true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const contactUs = mongoose.model("contactUs", contactUsSchema);
module.exports = contactUs;
