// routes/student.js
const express = require("express");
const auth = require("../middleware/auth");
const Student = require("../models/student");

const router = express.Router();

// Get student profile
router.get("/profile", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Other student routes...

module.exports = router;
