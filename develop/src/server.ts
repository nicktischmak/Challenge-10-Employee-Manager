import express from "express";
import inquirer from "inquirer";
import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

const promptUser = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role",
                "Update an employee's manager",
                "View employees by manager",
                "View employees by department",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "View the total utilized budget of a department"
            ]
        }
    ])
    .then(async (answers) => {
        if (answers.action === "View all departments") {
            pool.query('SELECT * FROM departments', (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(result.rows);
                }
            });
        } else if (answers.action === "View all roles") {
            pool.query('SELECT * FROM roles', (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(result.rows);
                }
            });
        } else if (answers.action === "View all employees") {
            pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(result.rows);
                }
            });
        } else if (answers.action === "Add a department") {
            const department = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the department?"
                }
            ]);
            pool.query('INSERT INTO departments (name) VALUES ($1)', [department.name], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Department ${department.name} added!`);
                }
            });
        } else if (answers.action === "Add a role") {
            const role = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the title of the role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "input",
                    name: "department",
                    message: "What is the department ID for the role?"
                }
            ]);
            pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [role.title, role.salary, role.department], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Role ${role.title} added!`);
                }
            });
        } else if (answers.action === "Add an employee") {
            const employee = await inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the employee?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the employee?"
                },
                {
                    type: "input",
                    name: "role",
                    message: "What is the role ID of the employee?"
                },
                {
                    type: "input",
                    name: "manager",
                    message: "What is the manager ID of the employee?"
                }
            ]);
            pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employee.firstName, employee.lastName], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Employee ${employee.firstName} ${employee.lastName} added!`);
                }
            });
        } else if (answers.action === "Update an employee's role") {
            const employee = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the employee you want to update?"
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "What is the new role ID for the employee?"
                }
            ]);
            pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [employee.roleId, employee.id], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Employee ID ${employee.id} updated with new role ID ${employee.roleId}!`);
                }
            });
        } else if (answers.action === "Update an employee's manager") {
            const employee = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the employee you want to update?"
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "What is the new manager ID for the employee?"
                }
            ]);
            pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2', [employee.managerId, employee.id], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Employee ID ${employee.id} updated with new manager ID ${employee.managerId}!`);
                }
            });
        } else if (answers.action === "View employees by manager") {
            const manager = await inquirer.prompt([
                {
                    type: "input",
                    name: "managerId",
                    message: "What is the ID of the manager?"
                }
            ]);
            pool.query('SELECT * FROM employees WHERE manager_id = $1', [manager.managerId], (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(result.rows);
                }
            });
        } else if (answers.action === "View employees by department") {
            const department = await inquirer.prompt([
                {
                    type: "input",
                    name: "departmentId",
                    message: "What is the ID of the department?"
                }
            ]);
            pool.query('SELECT * FROM employees WHERE department_id = $1', [department.departmentId], (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(result.rows);
                }
            });
        } else if (answers.action === "Delete a department") {
            const department = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the department you want to delete?"
                }
            ]);
            pool.query('DELETE FROM departments WHERE id = $1', [department.id], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Department ID ${department.id} deleted!`);
                }
            });
        } else if (answers.action === "Delete a role") {
            const role = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the role you want to delete?"
                }
            ]);
            pool.query('DELETE FROM roles WHERE id = $1', [role.id], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Role ID ${role.id} deleted!`);
                }
            });
        } else if (answers.action === "Delete an employee") {
            const employee = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the employee you want to delete?"
                }
            ]);
            pool.query('DELETE FROM employees WHERE id = $1', [employee.id], (err: Error) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Employee ID ${employee.id} deleted!`);
                }
            });
        } else if (answers.action === "View the total utilized budget of a department") {
            const department = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the department?"
                }
            ]);
            pool.query('SELECT SUM(salary) AS total_budget FROM employees WHERE department_id = $1', [department.id], (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(`Total utilized budget for department ID ${department.id} is ${result.rows[0].total_budget}`);
                }
            });
        }
    });

    return answers;
};

const main = async () => {
    const action = await promptUser();
    console.log(`You chose to: ${action}`);
};

main();

app.use((_req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });