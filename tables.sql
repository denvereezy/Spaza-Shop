
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

INSERT INTO Purchases (Qty,Purchase_price,Purchase_date,Product_Id, Supplier_Id)
SELECT stock_purchases_csv.quantity,stock_purchases_csv.cost,stock_purchases_csv.date, Products.Id AS product_id, Suppliers.Id AS supplier_id
FROM stock_purchases_csv 
INNER JOIN Suppliers
ON Suppliers.Name = stock_purchases_csv.shop
INNER JOIN Products
ON Products.Name = stock_purchases_csv.item;
