const express = require("express");
const feedbackRoutes = express.Router();

const feedbackController = require("../controllers/feedback");

feedbackRoutes.get("/feedback", feedbackController.getContactUs);

feedbackRoutes.post("/feedback", feedbackController.addContactUs);

module.exports = feedbackRoutes;
