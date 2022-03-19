var express = require("express");
var router = express.Router();
const Teacher = require("../../models/Teacher");

const bcrypt = require("bcryptjs");
const _ = require("lodash");

// const { validateProduct } = require("../../models/Product");

router.get("/signup", async (req, res) => {
  try {
    let result = new Teacher();
    result.email = req.body.email;
    result.name = req.body.name;
    let salt = await bcrypt.genSalt(10);
    result.password = await bcrypt.hash(req.body.password, salt);
    result = await result.save();
    result = _.pick(result, ["name", "email", "role", "_id"]);
    return res.send(result);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});
router.get("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;

    let result = await Teacher.findOne({ email: email });
    if (!result) {
      return res.status(404).send("User with given email was not found");
    }

    let isValid = await bcrypt.compare(password, result.password);
    if (!isValid) {
      return res.status(404).send("Invalid Password");
    }

    result = _.pick(result, ["name", "email", "role", "_id"]);

    return res.send(result);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});
router.get("/", async function (req, res) {
  try {
    let page = Number(req.query.page);
    let perPage = Number(req.query.perPage);

    page = (page - 1) * perPage;

    let result = await Teacher.find(req.body).skip(page).limit(perPage);

    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
});
router.get("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      return res.status(400).send("Teacher with given ID not found");
    }
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(400).send("The format of id is not correct");
  }
});
// router.post("/", async function (req, res) {
//   try {
//     let result = new Teacher();
//     result.name = req.body.name;
//     result.phone = req.body.phone;
//     result.email = req.body.email;
//     result.password = req.body.password;
//     let salt = await bcrypt.genSalt(10);
//     result.password = await bcrypt.hash(result.password, salt);
//     result = await result.save();
//     return res.send(result);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send(err.message);
//   }
// });

router.put("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      return res.status(400).send("The record with given id was not found");
    }

    result = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
});
router.delete("/:id", async function (req, res) {
  try {
    let result = await Teacher.findById(req.params.id);
    if (!result) {
      return res.status(400).send("record with given ID not found");
    }
    result = await Teacher.findByIdAndDelete(req.params.id);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
});

module.exports = router;
