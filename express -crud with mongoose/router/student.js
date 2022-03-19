const express = require("express");

const router = express.Router();

const Student = require("../models/Students");

//default
// router.get("/", function (req, res) {
//   res.send("Hello World I am here");
// });

//Post data
router.post("/api/students", async (req, res) => {
  try {
    const user = Student(req.body);
    let result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/students", async (req, res) => {
  try {
    const student = await Student.find();
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

//get one
router.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

//Put data
router.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

//Delete data
router.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.send(student);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
