-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY "";
-- DROP DATABASE IF EXISTS employee_db;
-- CREATE DATABASE employee_db;
-- USE employee_db;

--  CREATE TABLE departments(
--  dept_id INT AUTO_INCREMENT NOT NULL, 
--  dept_name VARCHAR(30) NOT NULL,
--  PRIMARY KEY(dept_id)
--  );

-- CREATE TABLE roles(
-- 	role_id INT AUTO_INCREMENT NOT NULL, 
-- 	title varchar(30) NOT NULL,
--  salary decimal(10,2),
-- 	dept_id INT,
-- 	PRIMARY KEY(role_id),
-- 	FOREIGN KEY (dept_id)
-- 		REFERENCES departments(dept_id)
--  );

-- CREATE TABLE employees(
-- 	employee_id INT AUTO_INCREMENT NOT NULL,
-- 	first_name varchar(30),
--     last_name varchar(30),
--     role_id INT,
--     manager_id INT, 
-- 	PRIMARY KEY(employee_id),
-- 	FOREIGN KEY(role_id)
--  		REFERENCES roles(role_id),
-- 	FOREIGN KEY (manager_id)
--  		REFERENCES roles(role_id)
-- );

insert into departments(dept_name) Values
("Sales"),
("Marketing"), 
("Finance"),
("HR"),
("UI/UX"),
("Back_End"),
("DB_Mgmt"),
("Legal"),
("Executive");

 insert into roles(title, salary, dept_id) VALUES
 ("Account Manager", 75000.00, 1),
 ("Sales Director", 120000.00, 1),
 ("Marketing Associate", 65000.00, 2),
 ("Marketing Director", 100000.00, 2),
 ("Accountant", 80000.00, 3),
 ("Finance Director", 110000.00, 3),
 ("HR Representative", 80000.00, 4),
 ("HR Director", 110000.00, 4),
 ("UI/UX Engineer", 95000.00, 5),
 ("UI/UX Project Director", 125000.00, 5),
 ("Back-End Engineer", 95000.00, 6),
 ("Back-End Project Director", 125000.00, 6),
 ("Junior Database Manager", 95000.00, 7),
 ("Senior Database Manager", 95000.00, 7),
 ("Lawyer", 120000.00, 8),
 ("CEO", 150000.00, 9);

INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES
("Clint", "Westman", 1, 2),
("Marcy", "Jones", 1, 2),
("Thomas", "Zarik", 2, 18),
("Amanda", "Glaiser", 3, 4),
("Dennis", "Connelley", 3, 4),
("Sarah", "Hansen", 4, 18),
("Dominique", "Montague", 3, 4),
("Paul", "Marshall", 3, 4),
("Tavarus", "Haskell", 4, 18),
("Carolina", "Espinoza", 5, 6),
("Brandon", "Lessoneo", 5, 6),
("Shivani", "Mathi", 6, 18), 
("Anderson", "Teller", 7, 8), 
("Annissa", "Paro", 7, 8),
("Joost", "Reick", 8, 18),
("Raquel", "Elon", 9, 10),
("Steven", "Kaizu", 9, 10),
("Allison", "Stanopolis", 9, 10),
("Hema", "Patel", 10, 18),
("Carter", "Jensen", 11, 12),
("Arturo", "Amador", 11, 12),
("Kianna", "Whitman", 11, 12),
("Daniel", "Chou", 12, 18),
("Peter", "Opio", 13, 14),
("Elena", "Klien", 13, 14), 
("Freida", "Plonoski", 14, 18),
("Mark", "Quinn", 15, 18),
("Monica", "DuPerow", 18, 18);
