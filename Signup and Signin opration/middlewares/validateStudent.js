// const { validateProduct } = require("../models/Product");
const Student = require("../models/Student");
module.exports = function (req, res, next) {
  let { error } = Student.validateStudent(req.body);
  if (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
  next();
};
