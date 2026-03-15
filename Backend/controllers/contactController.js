const Contact = require("../models/Contact");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: "Your message has been sent! We'll get back to you soon.",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark contact as resolved (admin)
// @route   PUT /api/contact/:id/resolve
// @access  Private/Admin
const resolveContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: "Message not found" });
    res.json({ success: true, message: "Marked as resolved", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContact, getAllContacts, resolveContact };