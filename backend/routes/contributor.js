const express = require("express");
const ContributorRoutes = express.Router();

const contributorController = require("../controllers/contributor");

ContributorRoutes.get("/contributor", contributorController.getContributorUsers);

module.exports = ContributorRoutes;