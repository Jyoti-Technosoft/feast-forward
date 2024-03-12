const express = require("express");
const contactUsRoutes = express.Router();

const contactUsController = require("../controllers/contactUs");

contactUsRoutes.get("/contactUs", contactUsController.getContactUs);

contactUsRoutes.post("/contactUs", contactUsController.addContactUs);

module.exports = contactUsRoutes;
