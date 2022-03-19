const mongoose = require("mongoose");
const Joi = require("joi");

const teacherSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, lowercase: true },
  password: String,
  role: { type: String, default: "normal" },
});

// schema.validateTeacher({});
teacherSchema.statics.validateTeacher = (data) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phone: Joi.string().max(11),
    email: Joi.string(),
    password: Joi.string(),
  });

  return joiSchema.validate(data, { abortEarly: false });
};

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
