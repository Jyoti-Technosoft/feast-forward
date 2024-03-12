const mongoose = require("mongoose");
const { string } = require("yargs");

const donateSchema = new mongoose.Schema({
  donateId: { type: String },
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
  address: {
    type: String,
    required: true,
  },
  mealQuantity: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  donationDate: {
    type: String,
    required: false
  },
  donorType: {
    type: String,
    required: true
  },
  organizationName: {
    type: String
  }
});

const donate = mongoose.model("donate", donateSchema);
module.exports = donate;
