const express= require("express");
const mysql= require("mysql");
const inquirer= require("inquirer");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
    console.log("connected as id " + connection.threadId);
    start();
});


function start(){
    //prompt user what action they would like to do first:
    //1. view all employees
    //2. serach for employees
    //3. manage employees

};

//listen on port
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });