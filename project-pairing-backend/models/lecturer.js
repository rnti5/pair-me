// models/Lecturer.js
const mongoose = require("mongoose");

const LecturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  referenceNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  primarySkills: { type: String, required: true },
  secondarySkills: { type: String, required: true },
  programmingLanguages: { type: String, required: true },
});

module.exports = mongoose.model("Lecturer", LecturerSchema);
