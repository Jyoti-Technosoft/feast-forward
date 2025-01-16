const express = require("express");
const authRoutes = express.Router();

const authController = require("../controllers/auth");
const { verifyUserToken } = require("../controllers/authController");

authRoutes.post("/register", authController.registerUser);

authRoutes.post("/login", authController.loginUser);

authRoutes.post("/updateProfile", authController.updateProfile);

authRoutes.delete("/logout/:email", authController.logoutUser);

authRoutes.post("/resetPassword", verifyUserToken, authController.resetPassword);

module.exports = authRoutes;
