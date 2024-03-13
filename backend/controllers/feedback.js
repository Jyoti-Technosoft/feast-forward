const feedbackSchema = require("../models/feedback");

const getFeedback = async (req, res) => {
  try {
    const feedback = await feedbackSchema.find();
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error while fetching feedbacks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addFeedback = async (req, res) => {
  const feedback = req.body;
  try {
    const newFeedback = new feedbackSchema({
      serviceSatisfaction: feedback.serviceSatisfaction,
      foodQuality: feedback.foodQuality,
      experience: feedback.experience,
      suggestions: feedback.suggestions,
    });
    const feedbackSave = await newFeedback.save();
    if (feedbackSave) {
      res
        .status(200)
        .json({ message: "Feedback added", feedback: feedbackSave });
    } else {
      res.status(500).json({ message: "Feedback not added" });
    }
  } catch (error) {
    console.error("Error adding feedback", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getFeedback = getFeedback;
exports.addFeedback = addFeedback;
