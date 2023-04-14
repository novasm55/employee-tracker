USE employee_tracker;

-- Insert sample departments
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 70000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Johnson', 3, 1);
