// routes/lecturer.js
const express = require("express");
const auth = require("../middleware/auth");
const Lecturer = require("../models/ecturer");

const router = express.Router();

// Get lecturer profile
router.get("/profile", auth, async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.lecturer.id).select(
      "-password"
    );
    res.json(lecturer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Other lecturer routes...

module.exports = router;
