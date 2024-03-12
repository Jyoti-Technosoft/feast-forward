const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await usersSchema.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUsers = async (req, res) => {
  const user = req.body;
  try {
    const newUser = new usersSchema({
      username: user.username,
      email: user.email,
      contactNo: user.contactNo,
      city: user.city,
      address: user.address,
      password: user.password,
    });
    const userSave = await newUser.save();
    if (userSave) {
      res.status(200).json({ message: "User added", user: userSave });
    } else {
      res.status(500).json({ message: "User not added" });
    }
  } catch (error) {
    console.error("Error adding user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, contactNo, city, address, password } = req.body;
  try {
    const checkUserAlreadyExist = await usersSchema.findOne({ email });
    if (checkUserAlreadyExist) {
      return res
        .status(201)
        .json({ message: "Account with this Email already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignUp = new usersSchema({
      username,
      email,
      contactNo,
      city,
      address,
      password: hashedPassword,
    });
    await newSignUp.save();
    res.status(200).json({ message: "Registeration successfull" });
  } catch (error) {
    console.error("Error while registering user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await usersSchema.findOne({ email });
    if (!checkUser) {
      return res.status(201).json({ message: "User not exist." });
    }
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: checkUser._id }, "77885566", {
        expiresIn: "12h",
      });
      checkUser.token = token;
      await checkUser.save();
      return res.status(200).json({
        message: "Login succesfully done",
        user: { email, password, token },
      });
    } else {
      return res
        .status(500)
        .json({ message: "Invalid Credentials. Please try again." });
    }
  } catch (error) {
    console.error("Error while login", error);
    res
      .status(500)
      .json({ message: "No response from server. Please try again." });
  }
};

const logoutUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await usersSchema.findOne({ email });
    if (user) {
      user.token = "";
      await user.save();
      res.status(200).json({ message: "User logged out successfully." });
    }
  } catch (error) {
    console.error("Error while logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUsers = getUsers;
exports.addUsers = addUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
