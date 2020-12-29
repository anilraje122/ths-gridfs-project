var express = require("express");
var logger = require("morgan");
const db = require("./config/dbConnect");

var usersRouter = require("./routes/users.route");
var filesRouter = require("./routes/file.route");

var app = express();

db();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", usersRouter);
app.use("/api/file", filesRouter);

module.exports = app;
