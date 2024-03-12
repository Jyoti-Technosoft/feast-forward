const contactUsSchema = require("../models/contactUs");

const getContactUs = async (req, res) => {
  try {
    const contact = await contactUsSchema.find();
    return res.status(200).json({ contact });
  } catch (error) {
    console.error("Error while fetching contact info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addContactUs = async (req, res) => {
  const contact = req.body;
  try {
    const newContact = new contactUsSchema({
      contactType: contact.contactType,
      email: contact.email,
      contactNo: contact.contactNo,
      message: contact.message,
    });
    const contactSave = await newContact.save();
    if (contactSave) {
      res.status(200).json({ message: "Details added", contact: contactSave });
    } else {
      res.status(500).json({ message: "Details not added" });
    }
  } catch (error) {
    console.error("Error adding contact info", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getContactUs = getContactUs;
exports.addContactUs = addContactUs;
