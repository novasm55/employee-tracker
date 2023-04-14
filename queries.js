// Import the required packages
const mysql = require('mysql2');

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: '12345678',
  database: 'employee_tracker',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employee_tracker database.');
});

// Function to view all departments
async function viewDepartments() {
  const query = 'SELECT id, name FROM department';
  const [rows] = await connection.promise().query(query);
  return [rows];
}

// Function to view all roles
async function viewRoles() {
  const query = `
    SELECT role.id, role.title, role.salary, department.name as department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;
  const [rows] = await connection.promise().query(query);
  return [rows];
}

// Function to view all employees
async function viewEmployees() {
  const query = `
    SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager
    FROM employee e
    INNER JOIN role ON e.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `;
  const [rows] = await connection.promise().query(query);
  return [rows];
}

// Function to add a department
async function addDepartment(name) {
  const query = 'INSERT INTO department (name) VALUES (?)';
  await connection.promise().query(query, [name]);
}

// Function to add a role
async function addRole(title, salary, department_id) {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  await connection.promise().query(query, [title, salary, department_id]);
}

// Function to add an employee
async function addEmployee(first_name, last_name, role_id, manager_id = null) {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  await connection.promise().query(query, [first_name, last_name, role_id, manager_id]);
}

// Function to update an employee's role
async function updateEmployeeRole(employee_id, new_role_id) {
  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  await connection.promise().query(query, [new_role_id, employee_id]);
}

// Export the functions for use in other files
module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
