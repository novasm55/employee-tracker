const inquirer = require('inquirer');
const cTable = require('console.table');
const Db = require('./db')

const db = new Db();

const promptUser = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit',
    ],
  });

  switch (action) {
    case 'View all departments':
      const departments = await db.viewDepartments();
      console.table(departments);
      promptUser();
      break;

    case 'View all roles':
      const roles = await db.viewRoles();
      console.table(roles[0]);
      promptUser();
      break;
    case 'View all employees':
      const employees = await db.viewEmployees();
      console.table(employees[0]);
      promptUser();
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the department name:',
      });
      await db.addDepartment(departmentName);
      console.log(`Added department: ${departmentName}`);
      promptUser();
      break;
  // ...
case 'Add a role':
    const departmentsList = await db.viewDepartments();
    const departmentChoices = departmentsList.map((department) => ({
      name: department.name,
      value: department.id,
    }));
  
    const roleData = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for the role:',
        choices: departmentChoices,
      },
    ]);
  
    await addRole(roleData.title, roleData.salary, roleData.department_id);
    console.log(`Added role: ${roleData.title}`);
    promptUser();
    break;
  case 'Add an employee':
    const rolesList = await db.viewRoles();
    const roleChoices = rolesList.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  
    const employeeData = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee last name:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role for the employee:',
        choices: roleChoices,
      },
    ]);
  
    await db.addEmployee(
      employeeData.first_name,
      employeeData.last_name,
      employeeData.role_id
    );
    console.log(`Added employee: ${employeeData.first_name} ${employeeData.last_name}`);
    promptUser();
    break;
  case 'Update an employee role':
    const employeesList = await db.viewEmployees();
    const employeeChoices = employeesList.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  
    const updateData = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'new_role_id',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
    ]);
  
    await db.updateEmployeeRole(updateData.employee_id, updateData.new_role_id);
    console.log(`Updated employee role.`);
    promptUser();
    break;
  // ...
  
    case 'Exit':
      console.log('Goodbye!');
      await db.close(); // Close the database connection
      process.exit(0);
      break;
  }
};

promptUser();
