DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40) NOT NULL,
	department_name VARCHAR(20),
	price FLOAT(8,2) NOT NULL,
	stock_quantity INT(10),
	PRIMARY KEY (item_id)
);
