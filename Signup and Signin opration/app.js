var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("config");

var indexRouter = require("./routes/index");
var teachersRouter = require("./routes/api/teacher");
var studentsRouter = require("./routes/api/student");
var validateStudent = require("./middlewares/validateStudent");
const validateTeacher = require("./middlewares/validateTeacher");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes

app.use("/", indexRouter);
app.use("/api/teacher", validateTeacher, teachersRouter);
app.use("/api/student", validateStudent, studentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const db = config.get("db");
mongoose
  .connect(db)
  .then(async (data) => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error connecting MongoDB");
  });

module.exports = app;
