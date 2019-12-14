const express= require("express");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//listen on port
app.listen(PORT, function() {
  console.log("Welcome to Employee Tracker");
  require("./config/connection");
  var start = require("./app/manage");
  start();
  });