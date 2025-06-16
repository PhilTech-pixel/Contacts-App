const express = require("express");
const validateToken = require("../middleware/validateTokenHandler.js");

const router = express.Router();
const {
  getAllContacts,
  addContact,
  updateContact,
  getContactById,
  deleteContact,
} = require("../controllers/contactController.js");

router.use(validateToken);
router.route("/").get(getAllContacts);
router.route("/").post(addContact);
router.route("/:id").get(getContactById);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;
