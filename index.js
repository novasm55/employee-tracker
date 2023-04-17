// Import required libraries and modules
const inquirer = require('inquirer');
const cTable = require('console.table');
const Db = require('./db');

// Create an instance of the Db class
const db = new Db();

// Function to update an employee's role
async function updateEmployeeRole() {
  // Fetch employees and roles data
  const employeesList = await db.viewEmployees();
  const rolesList = await db.viewRoles();

  // Initialize employeeChoices and roleChoices variables
  const employeeChoices = employeesList.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const roleChoices = rolesList.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  // Prompt the user to select an employee and a new role
  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's role do you want to update?",
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'Which role do you want to assign the selected employee?',
      choices: roleChoices,
    },
  ]);

  // Update the employee's role in the database
  await db.updateEmployeeRole(employeeId, newRoleId);
  console.log("Employee's role has been updated!");
}

// Define the main function to prompt the user for actions
const promptUser = async () => {
  // List of actions for user to choose from
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

  // Execute functions based on the user's choice
  switch (action) {
    // Function to display all departments
    case 'View all departments':
      const departments = await db.viewDepartments();
      console.table(departments);
      promptUser();
      break;
    // Function to display all roles
    case 'View all roles':
      const roles = await db.viewRoles();
      console.table(roles);
      promptUser();
      break;
    // Function to display all employees
    case 'View all employees':
      const employees = await db.viewEmployees();
      console.table(employees);
      promptUser();
      break;
    // Function to add a department
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
    // Function to add a role
    case 'Add a role':
      const departmentsList = await db.viewDepartments();
      const departmentChoices = departmentsList.map((department) => ({
        name: department.name,
        value: department.id,
      }));
      // New follow-on prompt for additional user input to add role
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
      // Await statement to add role to DB
      await db.addRole(roleData.title, roleData.salary, roleData.department_id);
      console.log(`Added role: ${roleData.title}`);
      promptUser();
      break;
    // Function to add an employee
    case 'Add an employee':
      const rolesList = await db.viewRoles();
      const roleChoices = rolesList.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const employeesList = await db.viewEmployees();
const employeeChoices = employeesList.map((employee) => ({
  name: `${employee.first_name} ${employee.last_name}`,
  value: employee.id,
}));

      // New follow-on prompt for additional user input to add employee
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
        // Manager prompt START
        // Fetch the list of employees for the manager selection


// Add a new prompt for manager selection
{
  type: 'list',
  name: 'manager_id',
  message: 'Select the manager for the employee:',
  choices: [...employeeChoices, { name: 'None', value: null }],
}
      
        //Manager prompt END  
      ]);
      // Await statement to add employee to DB
      await db.addEmployee(
        employeeData.first_name,
        employeeData.last_name,
        employeeData.role_id,
        employeeData.manager_id,
      );

      console.log(`Added employee: ${employeeData.first_name} ${employeeData.last_name}`);
      promptUser();
      break;

    // Function to update an employee's role
    case 'Update an employee role':
      await updateEmployeeRole();
      promptUser();
      break;

    // Exit
    case 'Exit':
      console.log('Goodbye!');
      await db.close(); // Close the database connection
      process.exit(0);
      break;
  }
};

promptUser();
