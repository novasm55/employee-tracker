# Employee Management System

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description 

This application allows you to manage employees in Git Bash terminal via node.js and modifying mySQL databases

## Installation

Installation instructions:

To run this application in Git Bash, follow these steps: 


Install Node.js if you haven't already. You can download it from the official website: https://nodejs.org/en/download/

Make sure Git is installed on your system. If not, download it from the official website: https://git-scm.com/downloads

Open Git Bash and navigate to the directory containing your project files using the cd command. For example:

bash
Copy code
cd /c/Users/your_username/your_project_folder
Replace your_username and your_project_folder with the appropriate values for your system.

If you haven't already, initialize a new Node.js project by running:

csharp
Copy code
npm init -y
Install the required dependencies for your project:

javascript
Copy code
npm install inquirer mysql2 console.table
Ensure that your MySQL database is set up and running. If not, start the MySQL server and create the employee_tracker database using the provided schema.sql file.

Update the MySQL connection details in the db.js file (or whichever file contains your MySQL connection details) to match your local MySQL server credentials:

javascript
Copy code
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'employee_tracker',
});
Replace your_username and your_password with your MySQL username and password.

To run the application, execute the following command in Git Bash:

Copy code
node index.js
This will start the application and present you with a list of choices to interact with the employee tracker.

Follow the prompts to perform various actions, such as viewing departments, roles, and employees, or adding and updating employee data.

To exit the application, choose the 'Exit' option from the list of actions.



## Usage

Usage instructions:

Make sure to synchronize your host, username, password and database values for your needs

## License


  
  ![License](https://img.shields.io/badge/license-MIT-red.svg)

  This project was created under the MIT license and the creator retains all the rights and privileges this license confers on its possessor!

## Contributing

None at present

## Tests

Test Instructions:

None at present

## Questions

If you have questions, suggestions, comments or concerns please reach me at novasmichael93@gmail.com. 

Check out my portfolio at novasm55@github.com.