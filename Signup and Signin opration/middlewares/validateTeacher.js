// const { validateProduct } = require("../models/Product");
const Teacher = require("../models/Teacher");
module.exports = function (req, res, next) {
  let { error } = Teacher.validateTeacher(req.body);
  if (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
  next();
};
