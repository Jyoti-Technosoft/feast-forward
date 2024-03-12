const express = require("express");
const joinNowUsersRoutes = express.Router();

const joinNowUsersController = require("../controllers/joinNowUsers");

joinNowUsersRoutes.get("/joinNowUsers", joinNowUsersController.getJoinNowUsers);

joinNowUsersRoutes.post("/joinNowUsers", joinNowUsersController.addJoinNowUsers);

module.exports = joinNowUsersRoutes;
