const express = require("express");
const app = express();
require("./connection");

const router = require("./router/student");
app.use(express.json());

app.use(router);

app.listen(8080);
