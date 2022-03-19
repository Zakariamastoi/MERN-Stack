const Joi = require("joi");
const mongoose = require("mongoose");
var studentSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, lowercase: true },
  password: String,
  role: { type: String, default: "normal" }, //admin,normal
});

studentSchema.statics.validateStudent = (data) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    phone: Joi.string().max(11),
    password: Joi.string().min(8).max(12),
    email: Joi.string().email(),
  });
  return joiSchema.validate(data, { abortEarly: false });
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
