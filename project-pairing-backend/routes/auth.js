// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Lecturer = require("../models/lecturer");

const router = express.Router();

// Student registration
router.post("/student/register", async (req, res) => {
  const {
    fullName,
    studentRefNumber,
    email,
    skills,
    desiredProjectField,
    password,
  } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: "Student already exists" });
    }
    student = new Student({
      fullName,
      studentRefNumber,
      email,
      skills,
      desiredProjectField,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    await student.save();
    const payload = { student: { id: student.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Lecturer registration
router.post("/lecturer/register", async (req, res) => {
  const {
    name,
    referenceNumber,
    email,
    password,
    primarySkills,
    secondarySkills,
    programmingLanguages,
  } = req.body;
  try {
    let lecturer = await Lecturer.findOne({ email });
    if (lecturer) {
      return res.status(400).json({ msg: "Lecturer already exists" });
    }
    lecturer = new Lecturer({
      name,
      referenceNumber,
      email,
      password,
      primarySkills,
      secondarySkills,
      programmingLanguages,
    });
    const salt = await bcrypt.genSalt(10);
    lecturer.password = await bcrypt.hash(password, salt);
    await lecturer.save();
    const payload = { lecturer: { id: lecturer.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Student login
router.post("/student/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { student: { id: student.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Lecturer login
router.post("/lecturer/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let lecturer = await Lecturer.findOne({ email });
    if (!lecturer) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, lecturer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { lecturer: { id: lecturer.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
