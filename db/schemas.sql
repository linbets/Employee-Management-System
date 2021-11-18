DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE role (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	salary DECIMAL NOT NULL,
	department_id INT NOT NULL,
	CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id)
);
CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT,
	CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
	CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department (name)
    VALUES 
        ('Sales'),
        ('Marketing')
        ('Accounting')
        ('Payroll')
        ('IT');

INSERT INTO role (title, salary, department_id)
    VALUES 
        ('sales person', 50000, 1),
        ('Marketing', 55000, 2),
        ('Accounting', 60000, 3),
        ('Payroll' 65000, 4),
        (IT, 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    ('Lindsey', 'Betsinger', 3, NULL),
    ('Bob', 'Smith', 1, 1),
    ('Jane', 'Doe', 2, 1),
    ('Joe', 'Anderson', 4, 1),
    ('Lisa', 'Murphy', 5, 1);
