
create table users(
  id int auto_increment primary key,
  username varchar(100)
);

CREATE TABLE Categories
(
	Id int NOT NULL auto_increment primary key,
	Name char (100) not null
);


insert into users(username) values ('denvereezy');
INSERT INTO Categories (Name) VALUES ('Dairy');
INSERT INTO Categories (Name) VALUES ('Bakery');
INSERT INTO Categories (Name) VALUES ('Can Food');
INSERT INTO Categories (Name) VALUES ('Beverages');
INSERT INTO Categories (Name) VALUES ('Starch');
INSERT INTO Categories (Name) VALUES ('Meat');
INSERT INTO Categories (Name) VALUES ('Toiletries');
INSERT INTO Categories (Name) VALUES ('Fruits');
INSERT INTO Categories (Name) VALUES ('Candy');
INSERT INTO Categories (Name) VALUES ('Extras');

 CREATE TABLE Products
(
	Id int NOT NULL auto_increment,
	Name char (100) not null,
	Category_Id int not NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (Category_Id) REFERENCES Categories(Id)
);

INSERT INTO Products (Category_Id,Name) VALUES (1,'Milk 1l');
INSERT INTO Products (Category_Id,Name) VALUES (1,'Imasi');
INSERT INTO Products (Category_Id,Name) VALUES (2,'Bread');
INSERT INTO Products (Category_Id,Name) VALUES (3,'Chakalaka Can');
INSERT INTO Products (Category_Id,Name) VALUES (3,'Gold Dish Vegetable Curry Can');
INSERT INTO Products (Category_Id,Name) VALUES (4,'Fanta 500ml');
INSERT INTO Products (Category_Id,Name) VALUES (4,'Coke 500ml');
INSERT INTO Products (Category_Id,Name) VALUES (4,'Cream Soda 500ml');
INSERT INTO Products (Category_Id,Name) VALUES (5,'Iwisa Pap 5kg');
INSERT INTO Products (Category_Id,Name) VALUES (6,'Top Class Soy Mince');
INSERT INTO Products (Category_Id,Name) VALUES (7,'Shampoo 1 litre');
INSERT INTO Products (Category_Id,Name) VALUES (7,'Soap Bar');
INSERT INTO Products (Category_Id,Name) VALUES (8,'Bananas - loose');
INSERT INTO Products (Category_Id,Name) VALUES (8,'Apples - loose');
INSERT INTO Products (Category_Id,Name) VALUES (9,'Mixed Sweets 5s');
INSERT INTO Products (Category_Id,Name) VALUES (9,'Heart Chocolates');
INSERT INTO Products (Category_Id,Name) VALUES (10,'Rose (plastic)');
INSERT INTO Products (Category_Id,Name) VALUES (10,'Valentine Cards');

CREATE TABLE Suppliers
(
	Id int NOT NULL auto_increment primary key,
	Name varchar(255) NOT NULL
);

INSERT INTO Suppliers (Name) VALUES ('Epping Market');
INSERT INTO Suppliers (Name) VALUES ('Makro');
INSERT INTO Suppliers (Name) VALUES ('Game');
INSERT INTO Suppliers (Name) VALUES ('1 Up');
INSERT INTO Suppliers (Name) VALUES ('Homemade');
INSERT INTO Suppliers (Name) VALUES ('Joe Spaza Shop');
INSERT INTO Suppliers (Name) VALUES ('ChinaTown');

CREATE TABLE Purchases
(
    Id int NOT NULL auto_increment,
    Purchase_date Date,
    Purchase_price char (100) not null,
    Qty int NOT NULL,
    Product_Id int,
    Supplier_Id int,
    PRIMARY KEY (Id),
    FOREIGN KEY (Supplier_Id) REFERENCES Suppliers(Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 4, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 8, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 4, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 4, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 4, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 4, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);
INSERT INTO Purchases (Purchase_date, Purchase_price, Qty, Product_Id, Supplier_Id) VALUES(2015-1-23, 7.00, 3, 7, 1);

CREATE TABLE Sales
(
    Id int NOT NULL auto_increment,
    Sales_date Date,
    Qty int NOT NULL,
    Sales_price decimal(10,2),
    Product_Id int,
    PRIMARY KEY (Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 10, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 60, 80, 3);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 2, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 4, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 60, 30, 3);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 5, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 1, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 2, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 3, 30, 4);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 6, 30, 8);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 300, 30, 3);
INSERT INTO Sales (Sales_date, Qty, Sales_price, Product_Id) VALUES(2015-1-23, 150, 30, 3);