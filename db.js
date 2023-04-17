// Import the mysql2 promise-based library
const mysql = require('mysql2/promise');

// Define the Db class
class Db {
  // Constructor initializes the database connection
  constructor() {
    this.init();
  }

  // Initialize the database connection
  async init() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345678',
      database: 'employee_tracker',
    });
  }

  // Execute a query with optional parameters and return the result set
  async query(sql, params) {
    const [rows] = await this.connection.query(sql, params);
    return rows;
  }

  // Close the database connection
  async close() {
    await this.connection.end();
  }

  // Fetch all departments from the database
  async viewDepartments() {
    const sql = 'SELECT * FROM department';
    return await this.query(sql);
  }

  // Fetch all roles from the database
  async viewRoles() {
    const sql = 'SELECT * FROM role';
    return await this.query(sql);
  }

  // Fetch all employees, their roles, and departments from the database
  async viewEmployees() {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    const [rows] = await this.connection.query(query);
    return rows;
  }

  // Add a new department to the database
  async addDepartment(name) {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    return await this.query(sql, [name]);
  }

  // Add a new role to the database
  async addRole(title, salary, department_id) {
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return await this.query(sql, [title, salary, department_id]);
  }

  // Add a new employee to the database
  async addEmployee(first_name, last_name, role_id, manager_id) {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return await this.query(sql, [first_name, last_name, role_id, manager_id]);
  }
  

  // Update an employee's role in the database
  async updateEmployeeRole(employee_id, new_role_id) {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return await this.query(sql, [new_role_id, employee_id]);
  }
}

// Export the Db class for use in other modules
module.exports = Db;
