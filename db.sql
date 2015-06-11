 CREATE TABLE Suppliers
(
id int NOT NULL auto_increment,
name char (100) not null,
PRIMARY KEY (id)
);

 CREATE TABLE Purchase
(
Suppliers.id int NOT NULL auto_increment,
purchase_date timestamp,
PRIMARY KEY (Suppliers.id),
FOREIGN KEY (Products.id)
);

 CREATE TABLE Products
(
Products.id int NOT NULL auto_increment,
name char (100) not null,
PRIMARY KEY (Products.id),
FOREIGN KEY (Category.id)
);

 CREATE TABLE Sales
(
Sales.id int NOT NULL auto_increment,
PRIMARY KEY (Sales.id),
FOREIGN KEY (Products.id)
);

 CREATE TABLE Category
(
Category.id int NOT NULL auto_increment,
name char (100) not null,
PRIMARY KEY (Category.id)
);
