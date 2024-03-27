const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: String },
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
    required: true,
  },
});

const feedback = mongoose.model("feedback", feedbackSchema);
module.exports = feedback;
