const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//Controllers

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create(req.body);
  res.status(201).json({ message: "Create Contact" });
});
const updateContact = asyncHandler(async (req, res) => {
  //await Contact;
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  console.log(req.body);

  res.status(200).json({ message: "Update Contact" });
});
const getContactById = asyncHandler(async (req, res) => {
  //await Contact;
  res.status(200).json({ message: "Get Contact By Id" });
});
const deleteContact = asyncHandler(async (req, res) => {
  //await Contact;
  res.status(200).json({ message: "Delete Contact" });
});

module.exports = {
  getAllContacts,
  addContact,
  updateContact,
  getContactById,
  deleteContact,
};
