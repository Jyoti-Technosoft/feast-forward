const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: String },
  userName: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    required: true,
  },
  foodQuality: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  suggestions: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: ""
  },
});

const feedback = mongoose.model("feedback", feedbackSchema);
module.exports = feedback;
