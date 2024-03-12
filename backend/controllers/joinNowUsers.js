const joinNowUsersSchema = require("../models/joinNowUsers");

const getJoinNowUsers = async (req, res) => {
  try {
    const users = await joinNowUsersSchema.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addJoinNowUsers = async (req, res) => {
  const user = req.body;
  try {
    const newUser = new joinNowUsersSchema({
      fullName: user.fullName,
      email: user.email,
      contactNo: user.contactNo,
      reason: user.reason,
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

exports.getJoinNowUsers = getJoinNowUsers;
exports.addJoinNowUsers = addJoinNowUsers;
