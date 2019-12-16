var inquirer =  require("inquirer");
var table = require("console.table");

// searchEngine= require("./searchEngine");
connection = require("../config/connection");

//loop user back to main menu every time a action is completed
function loop(){
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
};

//log list of employees
function viewAll(){
    var query ="SELECT e.employee_id, e.first_name, e.last_name, r.title, r.salary, e.manager_id FROM employees e, roles r LEFT JOIN employees ON title WHERE e.role_id= r.role_id;"
    connection.query(query, (err, data)=>{
        if(err) throw err;
            console.table(data);
            loop();
    });
};
    

//all basic inquires into employees database;
var byNameSearch = function(){
    inquirer.prompt([
        {
            name: "nameType",
            message: "Would you like to search by First or Last name?",
            type: "list",
            choices: ["First Name", "Last Name"]
        },
        {
            name: "inputName",
            message: "Please input name:",
            type: "input"
        }
    ]).then(answers=>{
        var query = "SELECT * FROM employees WHERE ?";
        if(answers.nameType == "First Name"){
        connection.query(query, {first_name : answers.inputName}, function(err, res){
            if(err) throw err;
            if(res==""){
                console.log("No emplyoees match your search. Please check your parameters and try again.");
            }
            res.forEach(output=>{
                console.table(output);
            });
            
            loop();
        });
        }else if(answers.nameType == "Last Name"){
            connection.query(query, {last_name : answers.inputName}, function(err, res){
                if(err) throw err;
                if(res==""){
                    console.log("No emplyoees match your search. Please check your parameters and try again.");
                }
                res.forEach(output=>{
                    console.table(output);
                });
                
            loop();
            });
        };
    });
}

function byRoleSearch(){
    connection.query("SELECT title from roles", function (err, res){
        if (err) throw err; 
        var roleArray = [];
        res.forEach(role =>{
            roleArray.push(role.title);
        })
        inquirer.prompt([
            {
                name:"role",
                message: "Please select role of employee:",
                type: "list",
                choices: roleArray
            }
        ]).then(choice =>{
            var query =`SELECT d.employee_id, d.first_name, d.last_name, d.title FROM (SELECT e.employee_id, e.first_name, e.last_name, r.title, r.salary, e.manager_id FROM employees e, roles r LEFT JOIN employees ON title WHERE e.role_id= r.role_id) d WHERE d.title="${choice}";`
            connection.query(query, (err, data)=>{
                if(err) throw err;
                    console.log(data); //returns empty array, not sure why since this query works in mysql itself;
                    loop();
            });
        })
    })
}


//produce switch statement to determine search function
function searchEmployees(){
    inquirer.prompt([
        {
            name: "searchType",
            message: "How would you like to search the directory?",
            type: "list", 
            choices: ["Name", "Role", "Department", "ID Number"]
        }
    ]).then(choice=>{
        switch (choice.searchType){
            case "Name":
                byNameSearch();
            break;
            case "Role":
                byRoleSearch();
            break;
            case "Department":
                byDeptSearch();
            break;
            case "ID Number":
                byIDSearch();
        };
    })
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