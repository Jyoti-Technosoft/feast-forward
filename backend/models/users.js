const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userId: { type: String },
  fullName: {
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
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requires: true,
  },
  token: {
    type: String,
    expires: "60m",
  },
});

const users = mongoose.model("users", usersSchema);
module.exports = users;
