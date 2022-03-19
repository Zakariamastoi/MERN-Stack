const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  adress: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
