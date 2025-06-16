const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//Controllers

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    phone,
    email,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
const updateContact = asyncHandler(async (req, res) => {
  //await Contact;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(req.params.id);
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other users cnotacts"
    );
  }

  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});
const getContactById = asyncHandler(async (req, res) => {
  //await Contact;

  const { id } = req.params;
  const getContact = await Contact.findById(id);
  if (!getContact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(getContact);
});
const deleteContact = asyncHandler(async (req, res) => {
  //await Contact;
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other users cnotacts"
    );
  }
  const { id } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted Contact" });
});

module.exports = {
  getAllContacts,
  addContact,
  updateContact,
  getContactById,
  deleteContact,
};
