const express = require("express");
const joinNowUsersRoutes = express.Router();

const joinNowUsersController = require("../controllers/joinNowUsers");
const { checkAdminToken } = require("../controllers/authController");

joinNowUsersRoutes.get("/joinNowUsers", checkAdminToken, joinNowUsersController.getJoinNowUsers);

joinNowUsersRoutes.post("/joinNowUsers", joinNowUsersController.addJoinNowUsers);

module.exports = joinNowUsersRoutes;
