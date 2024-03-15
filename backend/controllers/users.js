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
      fullName: user.fullName,
      email: user.email,
      contactNo: user.contactNo,
      city: user.city,
      address: user.address,
      password: user.password,
      role: user.role,
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

exports.getUsers = getUsers;
exports.addUsers = addUsers;
