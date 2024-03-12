const express = require("express");
const userRoutes = express.Router();

const userController = require("../controllers/users");

userRoutes.get("/users", userController.getUsers);

userRoutes.post("/users", userController.addUsers);

userRoutes.post("/register", userController.registerUser);

userRoutes.post("/login", userController.loginUser);

userRoutes.delete("/logout/:email", userController.logoutUser);

module.exports = userRoutes;
