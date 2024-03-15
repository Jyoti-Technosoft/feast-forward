const express = require("express");
const userRoutes = express.Router();

const userController = require("../controllers/users");

userRoutes.get("/users", userController.getUsers);

userRoutes.post("/users", userController.addUsers);

module.exports = userRoutes;
