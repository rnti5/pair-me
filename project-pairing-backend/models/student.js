// models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentRefNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  skills: { type: String, required: true },
  desiredProjectField: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
