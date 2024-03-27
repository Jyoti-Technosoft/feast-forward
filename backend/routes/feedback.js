const express = require("express");
const feedbackRoutes = express.Router();

const feedbackController = require("../controllers/feedback");

feedbackRoutes.get("/feedback", feedbackController.getFeedback);

feedbackRoutes.post("/feedback", feedbackController.addFeedback);

module.exports = feedbackRoutes;
