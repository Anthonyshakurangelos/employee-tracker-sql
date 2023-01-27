INSERT INTO departments (department_name)
VALUES ("Injector"),
("Turbos"),
("Pumps"),
("Sales"),
("Shipping");

        
INSERT INTO roles (title, salary, department_id )
VALUES ("Injector Tech", 55000, 1),
("Injector Production", 45000, 1),
("Lead Turbo Tech", 60000, 2),
("Production", 50000, 2),
("Pump Tech", 50000, 3),
("Pump Prodction", 45000, 3),
("Sales", 65000, 4)
("Shipper", 38000, 5);

INSERT INTO employees ( first_name, last_name, roles_id)
values ("John", "Smith", 1),
("Steve", "Matt", 1 ),
("Sam", "Peter",2 ),
("Jesse", "Angelos", 2),
("Anthony", "Angelos", 3),
("Adrain", "Marin", 3),
("Alex", "Smith", 4),
("Isaic", "Johnson", 5);