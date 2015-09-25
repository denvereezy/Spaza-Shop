
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

