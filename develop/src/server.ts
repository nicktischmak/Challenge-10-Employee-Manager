import inquirer from "inquirer";
import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";

await connectToDb();

const PORT = process.env.PORT || 3001;

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
    ]);

    return answers.action;
};

