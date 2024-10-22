drop DATABASE IF EXISTS employees_db;
create DATABASE employees_db;

\c employees_db;

create table department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

create table role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal not null,
    department_id integer REFERENCES department(id),
    foreign key (department_id) references department(id),
);

create table employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id integer REFERENCES role(id),
    manager_id integer REFERENCES employee(id),
    foreign key (role_id) references role(id),
);