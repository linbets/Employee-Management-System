const inquirer = require("inquirer");
const connection = require("./db/connection");
require('console.table')

const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "viewEmployees",
          "viewDepartments",
          "viewRoles",
          "addEmployees",
          "addDepartments",
          "addRoles",
          "updateEmployeeRole",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "viewEmployees":
          viewEmployees();
          break;
        case "viewDepartments":
          viewDepartments();
          break;
        case "viewRoles":
          viewRoles();
          break;
        case "addEmployees":
          addEmployees();
          break;
        case "addDepartments":
          addDepartments();
          break;
        case "addRoles":
          addRoles();
          break;
        case "updateEmployeeRole":
          updateEmployeeRole();
          break;
        default:
          break;
      }
    });
};


const viewEmployees = () => {
    connection.query("SELECT * from employee", (err, data) => {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        start();
    })
}
const viewDepartments = () => {
    connection.query("SELECT * from department", (err, data) => {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        start();
    })
}
const viewRoles = () => {
    connection.query("SELECT * from role", (err, data) => {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        start();
    })
}

const addDepartments = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is department name?"
        }
    ]).then((answer) => {
        connection.query("INSERT INTO department SET ?", answer, (err, data) => {
            if (err) throw err;
            console.log("\n");
            console.table(data);
            start();
        })
    });
}

const addRoles = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is role salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is role department_id?"
        }
    ]).then((answer) => {
        connection.query("INSERT INTO role SET ?", answer, (err, data) => {
            if (err) throw err;
            console.log("\n");
            console.table(data);
            start();
        })
    });
}

const addEmployees = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is role first_name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is role last_name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is role role_id?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is role manager_id?"
        }
    ]).then((answer) => {
        connection.query("INSERT INTO employee SET ?", answer, (err, data) => {
            if (err) throw err;
            console.log("\n");
            console.table(data);
            start();
        })
    });
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Which employee do you want to update?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What role should this employee be?"
        }
    ]).then((answer) => {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.roleId, answer.employeeId], (err, data) => {
            if (err) throw err;
            console.log("\n");
            console.table(data);
            start();
        })
    });
}

start();