const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  resolveContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", submitContact);
router.get("/", protect, admin, getAllContacts);
router.put("/:id/resolve", protect, admin, resolveContact);

module.exports = router;