var inquirer =  require("inquirer");
var table = require("console.table");
connection = require("../config/connection");

function viewAll(){
    connection.query("Select * from employees", (err, data)=>{
        if(err) throw err;
            console.table(data);
    inquirer.prompt([
        {
            name: "newAction",
            message: "Would you like to do something else?",
            type: "confirm"
        }
        ]).then(choice=>{
            if(choice.newAction){
                start();
            }else{
                process.exit();
            }
        });
      });
};

function searchEmployees(){
};

function manageEmployess(){
console.log("managing")
};


var start = function (){
    //prompt user what action they would like to do first:
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list", 
            choices: ["View all employees", "Search employees", "Manage employees"]
        }
    ]).then(choice=>{


        switch (choice.action){
            case "View all employees":
            viewAll();

            break;
            case "Search employees":
                searchEmployees();
            break;
            case "Manage employees":
                manageEmployess();
            default: "Please make a selection"
            return;

        }
    })
};







module.exports=start;