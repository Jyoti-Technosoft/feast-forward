const express = require("express");
const donateRoutes = express.Router();

const donateController = require("../controllers/donate");

donateRoutes.get("/donate", donateController.getDonateData);

donateRoutes.post("/donate", donateController.addDonateData);

module.exports = donateRoutes;
