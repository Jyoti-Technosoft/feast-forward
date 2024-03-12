const donateSchema = require("../models/donate");

const getDonateData = async (req, res) => {
  try {
    const data = await donateSchema.find();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDonateData = async (req, res) => {
  const data = req.body;
  try {
    const newData = new donateSchema({
      fullName: data.fullName,
      email: data.email,
      contactNo: data.contactNo,
      address: data.address,
      mealQuantity: data.mealQuantity,
      foodType: data.foodType,
      donationDate: data.donationDate,
      donorType: data.donorType,
      organizationName: data.organizationName,
    });
    const dataSave = await newData.save();
    if (dataSave) {
      res.status(200).json({ message: "Information added", data: dataSave });
    } else {
      res.status(500).json({ message: "Information not added" });
    }
  } catch (error) {
    console.error("Error while adding information", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDonateData = getDonateData;
exports.addDonateData = addDonateData;
