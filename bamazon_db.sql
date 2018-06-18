DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
  
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(10) NOT NULL, 
  stock INTEGER(10) NOT NULL, 
  inventory_purchased INTEGER(10), 
  stock_remaining INTEGER(10)

);


INSERT INTO products (product_name, department_name, price, stock)
VALUES ("iPhone charger", "electronics", 6.50 , 25);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("coffee maker", "appliances", 24.99, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Sex in the City (Season 2) DVD", "entertainment", 4.99, 100);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Law & Order (Season 4) DVD", "entertainment", 3.85, 50);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Plasma TV (50 inch)", "electronics", 105.00, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Athletic Shorts", "clothing", 15.75, 8);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("bath robe", "clothing", 23.99, 15);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("dog toy", "pet supplies", 4.99, 150);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("bird house", "pet supplies", 40.00, 13);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("baseball hat", "clothing", 4.99, 25);


