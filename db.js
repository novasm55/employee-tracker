const mysql = require('mysql2/promise');

class Db {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '12345678',
      database: 'employee_tracker',
    });
  }

  async query(sql, params) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async close() {
    await this.pool.end();
  }

  async viewDepartments() {
    const sql = 'SELECT * FROM department';
    return await this.query(sql);
  }

  async viewRoles() {
    const sql = 'SELECT * FROM role';
    return await this.query(sql);
  }

  async viewEmployees() {
    const sql = 'SELECT * FROM employee';
    return await this.query(sql);
  }

  async addDepartment(name) {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    return await this.query(sql, [name]);
  }

  async addRole(title, salary, department_id) {
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return await this.query(sql, [title, salary, department_id]);
  }

  async addEmployee(first_name, last_name, role_id) {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)';
    return await this.query(sql, [first_name, last_name, role_id]);
  }

  async updateEmployeeRole(employee_id, new_role_id) {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return await this.query(sql, [new_role_id, employee_id]);
  }
}

module.exports = Db;
