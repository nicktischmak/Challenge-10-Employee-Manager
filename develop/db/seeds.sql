insert into department (name) 
values
('Sales'),
('Marketing'),
('Engineering'),
('Human Resources'),
('Finance');

insert into role (title, salary, department_id)
values
('Sales Associate', 50000, 1),
('Marketing Manager', 60000, 2),
('Software Engineer', 80000, 3),
('HR Specialist', 55000, 4),
('Financial Analyst', 70000, 5);

insert into employee (first_name, last_name, role_id, manager_id)
values
('John', 'Doe', 3, NULL),
('Jane', 'Smith', 1, 1),
('Emily', 'Johnson', 2, 1),
('Michael', 'Brown', 4, 2),
('Sarah', 'Davis', 5, 3);