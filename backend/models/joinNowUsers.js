const mongoose = require("mongoose");

const joinNowUsersSchema = new mongoose.Schema({
  joinNowUsersId: { type: String },
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
  reason: {
    type: String,
    required: true,
  },
});

const joinNowUsers = mongoose.model("joinNowUsers", joinNowUsersSchema);
module.exports = joinNowUsers;
