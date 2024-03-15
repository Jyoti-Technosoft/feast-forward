const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = require("../models/users");

const registerUser = async (req, res) => {
  const { fullName, email, contactNo, city, address, password, role } =
    req.body;
  try {
    const checkUserAlreadyExist = await usersSchema.findOne({ email });
    if (checkUserAlreadyExist) {
      return res
        .status(201)
        .json({ message: "Account with this Email already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignUp = new usersSchema({
      fullName,
      email,
      contactNo,
      city,
      address,
      role: role || "volunteer",
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
        user: {
          fullName: checkUser.fullName,
          email,
          password,
          token,
          role: checkUser.role,
        },
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

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
      const checkUser = await usersSchema.findOne({ email });
      if (checkUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        checkUser.password = hashedPassword;
        await checkUser.save();
        return res.status(200).json({ message: "Password updated" });
      }
      return res.status(500).json({ message: "User not found" });
    } catch (error) {
      console.error("Error while updating password:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};  

// This creates a password reset token, which is stored in the database.
// The token is then associated with the user, usually in the same database entry.
// An email is sent to the user with a link that has the password reset token embedded into it.

// const forgotPassword = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await usersSchema.findOne({ email });
//       if (user) {
//         user.password = password;
//         await user.save();
//         res.status(200).json({ message: "Password changed successfully." });
//       }
//     } catch (error) {
//       console.error("Error while processing:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
// };

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.resetPassword = resetPassword;
