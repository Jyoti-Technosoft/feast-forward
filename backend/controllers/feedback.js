const multer = require("multer");
const path = require("path");

const feedbackSchema = require("../models/feedback");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file?.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

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
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error during image upload:", err);
      return res.status(500).json({ message: "Error during image upload." });
    }
    const feedback = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    try {
      const newFeedback = new feedbackSchema({
        userName: feedback.userName,
        ratings: feedback.ratings,
        foodQuality: feedback.foodQuality,
        experience: feedback.experience,
        suggestions: feedback.suggestions,
        image: imagePath,
      });
      const feedbackSave = await newFeedback.save();
      if (feedbackSave) {
        return res.status(200).json({
          message: "Your feedback sent successfully!",
          feedback: feedbackSave,
        });
      } else {
        return res.status(500).json({ message: "Feedback not added." });
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};


exports.getFeedback = getFeedback;
exports.addFeedback = addFeedback;
