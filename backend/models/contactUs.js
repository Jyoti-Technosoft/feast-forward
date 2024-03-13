const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  contactUsId: { type: String },
  requestType: {
    type: String,
    required: true,
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
