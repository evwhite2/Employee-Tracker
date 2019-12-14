const mysql= require("mysql");

//connect to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
  });
  
  //feedback that we are connected to database, then start managment system
  connection.connect(function(err){
      if(err){
          console.log("Error connection: "+err.stack)
          return;
      }
    //   console.log("connected as id " + connection.threadId);
  });

  module.exports = connection;