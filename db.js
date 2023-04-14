const mysql = require('mysql2/promise');

class Db {
  constructor() {
    // Create a connection pool to manage multiple connections
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

  // Other methods...
}

module.exports = Db;
