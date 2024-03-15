const express = require("express");
const authRoutes = express.Router();

const authController = require("../controllers/auth");

authRoutes.post("/register", authController.registerUser);

authRoutes.post("/login", authController.loginUser);

authRoutes.delete("/logout/:email", authController.logoutUser);

authRoutes.delete("/resetPassword", authController.resetPassword);

module.exports = authRoutes;
