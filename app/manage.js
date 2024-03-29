var inquirer =  require("inquirer");
var table = require("console.table");

// searchEngine= require("./searchEngine");
connection = require("../config/connection");


//arrays for efficiency:
var roleArray = [];
var deptArray = [];
var employeeArray = [];

connection.query("SELECT title from roles", function (err, res){
    if (err) throw err;
    res.forEach(role =>{
        roleArray.push(role.title);
    })
});
connection.query("Select * from departments", function(err, res){
    if (err) throw err;
    res.forEach(dept =>{
        deptArray.push(dept.dept_name)
    })
});

//starter code which will define a list of employees to populate and allow user to scroll through all names to manage database in a more interactive way:
connection.query("Select employee_id, first_name, last_name FROM employees", function(err, res){
    if (err) throw err;
    res.forEach(employee =>{
        var fullName = employee.first_name+" "+employee.last_name;
        var simpleList = {
            id : employee.employee_id,
            full: fullName,
        }
        employeeArray.push(simpleList);
    });
});


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

var start = function (){
    //prompt user what action they would like to do first:
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list", 
            choices: ["View all employees", "Search employees", "Manage employees", "View role types", "View all departments"]
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
            break;
            case "View role types":
                viewroles();
            break;
            case "View all departments":
                viewdept();
            default: "Please make a selection"
            return;

        }
    })
};

//log list of employees
function viewAll(){
    var query = "SELECT e.employee_id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e LEFT OUTER JOIN employees e2 ON e.manager_id = e2.employee_id INNER JOIN roles r ON (r.role_id = e.role_id) INNER JOIN departments d ON (d.dept_id = r.dept_id);"

    connection.query(query, (err, data)=>{
        if(err) throw err;
            console.table(data);
            loop();
    });
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
    
        inquirer.prompt([
            {
                name:"role",
                message: "Please select role of employee:",
                type: "list",
                choices: roleArray
            }
        ]).then(choice =>{
            var query =`SELECT d.employee_id, d.first_name, d.last_name, d.title, d.salary FROM (SELECT e.employee_id, e.first_name, e.last_name, r.title, r.salary, e.manager_id FROM employees e, roles r LEFT JOIN employees ON title WHERE e.role_id= r.role_id) d WHERE d.title="${choice.role}";`
            connection.query(query, (err, data)=>{
                if(err) throw err;
                    console.table(data); 
                    loop();
            });
        })
}

function byDeptSearch(){
    
        inquirer.prompt([
            {
                name:"deptName",
                message: "Please select department of employee",
                type: "list",
                choices: deptArray
            }
        ]).then(choice=>{
            var query =`SELECT * FROM (SELECT e.employee_id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, concat(e2.first_name, " ", e2.last_name) AS manager FROM employees e LEFT OUTER JOIN employees e2 ON e.manager_id = e2.employee_id INNER JOIN roles r ON (r.role_id = e.role_id) INNER JOIN departments d ON (d.dept_id = r.dept_id)) derived WHERE derived.dept_name="${choice.deptName}";`
            connection.query(query, (err, data)=>{
                if(err) throw err;
                    console.table(data); 
                    loop();
            });
        })
}

function byIDSearch(){
    inquirer.prompt([
        {
            name:"eId",
            message: "Please input ID number of the employee",
            type: "input"
        }
    ]).then(input=>{
        var query =`SELECT * FROM (SELECT e.employee_id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, concat(e2.first_name, " ", e2.last_name) AS manager FROM employees e LEFT OUTER JOIN employees e2 ON e.manager_id = e2.employee_id INNER JOIN roles r ON (r.role_id = e.role_id) INNER JOIN departments d ON (d.dept_id = r.dept_id)) derived WHERE derived.employee_id="${input.eId}";`
        connection.query(query, (err, data)=>{
            if(err) throw err;
                console.table(data); 
                loop();
        });
    })
}

//all management routes
function manageEmployess(){
    inquirer.prompt([
        {
            name: "action",
            message: "Please select managment action:",
            type: "list",
            choices: ["Add new employee", "Delete employee", "Edit employee information"]
        }
    ]).then(choice=>{
        switch (choice.action){
            case "Add new employee":
                addEmployee();
            break;
            case "Delete employee":
                deleteEmployee();
            break;
            case "Edit employee information":
                editEmployee();
        }
    })
};

function addEmployee(){
    inquirer.prompt([
        {
            name: "first",
            message: "Please input FIRST name of new employee:",
            type: "input"
        },
        {
            name: "last",
            message: "Please input LAST name of new employee:",
            type: "input"
        },
        {
            name: "role",
            message: "Please input role ID number of the new employee:",
            type: "input"
        }, 
        {
            name: "manager",
            message: "Please input the ID number of the new employee's manager:",
            type: "input"
        }        
    ]).then(answers=>{
        var query =
            `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${answers.first}", "${answers.last}", ${answers.role},${answers.manager});`
        connection.query(query, function(err, res){
            if(err) throw err
            console.log(`New employee ${answers.first} ${answers.last} added.`);
            loop();
            
        })
    })
}

function deleteEmployee(){
    inquirer.prompt([
        {
            name: "del",
            message: "Please input the employee ID of the employee you wish to delete",
            type: "input"
        }
    ]).then(employee=>{
        var query =`DELETE FROM employees WHERE employee_id= ${employee.del}`;
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(`Employee with ID of ${employee.del} has been deleted.`);
            loop();
        })
    })
}

function editEmployee(){
    inquirer.prompt([
        {
            name: "eId",
            message: "Please input the id number of the employee you would like to edit",
            type: "input"
        }, 
        {
            name:"action", 
            message: "What information would you like to edit?",
            type: "list", 
            choices: ["first name", "last name", "role", "manager"]
        }
    ]).then(choices=>{
        connection.query(`SELECT * FROM employees WHERE employee_id=${choices.eId};`, (err, data)=>{
            if(err) throw err;
            console.log(`...editing ${data[0].first_name} ${data[0].last_name}, EID: ${data[0].employee_id}`);
                switch (choices.action){
                case "first name":
                    inquirer.prompt([
                        {
                            name:"action", 
                            message: "Input first name of employee",
                            type: "input"
                        }
                    ]).then(input =>{
                        connection.query(`UPDATE employees SET first_name="${input.action}" WHERE employee_id=${data[0].employee_id}`, (err, update)=>{
                            if(err) throw err;
                            console.log(`Employee ${data[0].employee_id} updated`);
                            loop();
                        });
                    });
                break;
                case "last name":
                    inquirer.prompt([
                        {
                            name:"action", 
                            message: "Input last name of employee",
                            type: "input"
                        }
                    ]).then(input =>{
                        connection.query(`UPDATE employees SET last_name="${input.action}" WHERE employee_id=${data[0].employee_id}`, (err, update)=>{
                            if(err) throw err;
                            console.log(`Employee ${data[0].employee_id} updated`);
                            loop();
                        });
                    });
                break;
                case "role":
                    inquirer.prompt([
                        {
                            name:"action", 
                            message: "Input new role ID for this employee",
                            type: "input"
                        }
                    ]).then(input =>{
                        connection.query(`UPDATE employees SET role_id="${input.action}" WHERE employee_id=${data[0].employee_id}`, (err, update)=>{
                            if(err) throw err;
                            console.log(`Employee ${data[0].employee_id} updated`);
                            loop();
                        });
                    });
                break;
                case "manager":
                    inquirer.prompt([
                        {
                            name:"action", 
                            message: "Input employee ID of new manager for this employee",
                            type: "input"
                        }
                    ]).then(input =>{
                        connection.query(`UPDATE employees SET manager_id="${input.action}" WHERE employee_id=${data[0].employee_id}`, (err, update)=>{
                            if(err) throw err;
                            console.log(`Employee ${data[0].employee_id} updated`);
                            loop();
                        });
                    });
                default: "Please make a selection"
                return;
            };
        })
    
    });
}
//views for convenient reference
function viewroles(){
    connection.query("SELECT * FROM roles", (err, data)=>{
        if(err) throw err;
        console.table(data);
        loop();
    })
}

function viewdept(){
    connection.query("SELECT * FROM departments", (err, data)=>{
        if(err) throw err;
        console.table(data);
        loop();
    })
}

module.exports=start;