// importing and requiring 
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');



const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    // if localhost don't work use 127.0.0.1
    {
     host: '127.0.0.1',

     user: 'root',

     password: process.env.DB_PASSWORD,
    //  add your password for my sql using dotenv
     database: 'employee_db'
    },
    console.log(`Connected to Employees database`)
);

// inquirer prompt questions
 function questions ()  {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'promptQuestion',
            message: 'what would you like to do?',
            choices: [
              "View All Employees",
              "View All Roles",
              "View All Departments",
              "Add Employee",
              "Add Role",
              "Add Department",
              "Update Employee Role"],
            default: true
            },
       ])
    .then((data) => {
        console.log(data);


        if (data.promptQuestion === 'View All Employees') {
            db.query('SELECT * FROM employees;', function (err, results){
                const allEmployees = [];
                allEmployees.push(results)
                console.table(results);
                return init();
            });
        }
       else if (data.promptQuestion === 'View All Departments') {
            db.query('SELECT * FROM departments;', function (err, results) {
              const allDepartments = [];
              allDepartments.push(results)
              console.table(results);
              return init();
            });  

          }
          else if (data.promptQuestion === 'View All Roles'){
            db.query('SELECT * FROM roles;', function (err, results) {
              const allRoles = [];
              allRoles.push(results)
              console.table(results);
              return init();
            });  
          }
 

else if (data.promptQuestion === 'Add Department'){
    return inquirer.prompt([
      {
        type: 'Type',
        name: 'name',
        message: 'What is the name of this new department you are adding?',
       },
    ])
    .then((data) =>{
      console.log(data);
      const newDepartment = data.addDepartment;
      db.query('INSERT INTO departments (department_name) VALUES (?);', data.name, function (err, results) {
        db.query('SELECT * FROM departments;', function (err, results) {
          const allEmployees = [];
          allEmployees.push(results)
          console.table(results);
          return init();})
      });
    }
  )
}
else if (data.promptQuestion === 'Add Role'){
  return inquirer.prompt([
    {
      type: 'Type',
      name: 'addRole',
      message: 'What is the name of the role you are adding?',
     },

     {
      type: 'Number',
      name: 'salary',
      message: 'What is the salary for the role?',
     },

     {
      type: 'list',
      name: 'getDepartment',

      message: 'What department is this role in"Injector Tech = 1" "Injector Production = 1" "Lead Turbo Tech = 2" "Production = 2" "Pump Tech= 3" "Pump Production = 3" "Sales = 4" "Shipper = 5")',
      choices: [1, 2, 3, 4, 5]
    },
  ])
  .then((data) =>{
    console.log(data);
    const newRole = [data.addRole,parseInt(data.salary),data.getDepartment]
    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', newRole, function (err, results) {
      db.query('SELECT * FROM roles;', function (err, results) {
        const allEmployees = [];
        const newRole = [];
        allEmployees.push(results)
        console.table(results);
        return init();})
    });
  }
)
}

else if (data.promptQuestion === 'Add Employee'){
  return inquirer.prompt([
    
    
    {
      type: 'Type',
      name: 'firstName',
      message: 'What is the employees first name?',
     },

     {
      type: 'Type',
      name: 'lastName',
      message: 'What is the employees last name?',
     },

     {
      type: 'list',
      name: 'role',
      message: 'What is the employees role? "Injector = 1" "Turbos = 2" "Pumps = 3" "Sales = 4" "Shipping = 5" ',
      choices: [1,2,3,4,5],
     },

  ])
  .then((data) =>{
    const newEmployee = [data.firstName, data.lastName, data.role];
            db.query(
              "INSERT INTO employees (first_name, last_name, roles_id) VALUES (?, ?, ?);",
              newEmployee,
              function (err, results) {
                db.query("SELECT * FROM employees;", function (err, results) {
                  const allEmployees = [];
                  allEmployees.push(results);
                  console.table(results);
                  return init();})
    // console.log(data);
    // const newEmployee = [data.firstName, data.lastName ,data.role]
    // db.query('INSERT INTO employees; ("first_name", "last_name", "roles_id") VALUES (?, ?, ?);', newEmployee, function (err, results) {
    //   db.query('SELECT * FROM employees;', function (err, results) {
    //     const allEmployees = [];
    //     allEmployees.push(results)
    //     newEmployee.push(results)
    //     console.log(results);
    //     return init();})
    });
  }
)
}

else if (data.promptQuestion === 'Update Employee Role'){
    db.query('SELECT * FROM employees left JOIN roles ON roles.id = employees.id;', function (err, results) {
      const allEmployees = [];
      const allRoles = [];
      results.forEach((employee) => {allEmployees.push(`${employee.id } ${employee.first_name} ${employee.last_name}`);});
      results.forEach((employee) => {
        allRoles.push(`${employee.title}`);

      });

      console.table(allEmployees);
      console.table(allRoles);
    return inquirer.prompt([
      
        {
        type: 'list',
        name: 'updateEmployee',
        message: 'Which employee would you like to update today?',
        choices: allEmployees
       },
       {
        type: 'list',
        name: 'roleChoice',
        message: 'Choose the role the employee is going to',
        choices: allRoles,
       },
    ])
    .then((data) => {       
        db.query(
          "Update roles SET title = ? where id = ?;",
          [data.roleChoice, data.updateEmployee[0]],
          function (err, results) {
            db.query(
              "SELECT * FROM employees left JOIN roles ON roles.id = employees.id;",
              function (err, results) {
                const allEmployees = [];
                allEmployees.push(results);
                console.table(results);
                return init();
              }
            );
          }
        );
      });
  }
);
}
});
};
    

function init() {
 questions ()
}

init();


