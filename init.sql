#!/bin/bash
set -e

# Execute SQL commands to create the database and tables
mysql -u root -prootpassword <<-EOSQL
  CREATE DATABASE IF NOT EXISTS my_database;
  USE my_database;
  
  CREATE TABLE IF NOT EXISTS product_type (
    typeCode INT AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(100) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS products (
    productCode INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    productPurchased BOOLEAN NOT NULL DEFAULT FALSE,
    salePrice DECIMAL(10, 2) NOT NULL,
    typeCode INT NULL,
    FOREIGN KEY (typeCode) REFERENCES product_type(typeCode)
  );

  CREATE TABLE IF NOT EXISTS sales (
    saleCode INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sale_detail (
    saleCode INT,
    productCode INT,
    quantity INT NOT NULL,
    PRIMARY KEY (saleCode, productCode),
    FOREIGN KEY (saleCode) REFERENCES sales(saleCode),
    FOREIGN KEY (productCode) REFERENCES products(productCode)
  );

  INSERT IGNORE INTO product_type (typeCode, typeName) VALUES (1, 'Electronics');
  INSERT IGNORE INTO product_type (typeCode, typeName) VALUES (2, 'Clothing');
  INSERT IGNORE INTO product_type (typeCode, typeName) VALUES (3, 'Food');

  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (1, 'Smartphone', TRUE, 499.99, 1);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (2, 'Jeans', FALSE, 79.99, 2);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (3, 'Chocolate', TRUE, 5.99, 3);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (4, 'Laptop', TRUE, 899.99, 1);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (5, 'T-Shirt', FALSE, 19.99, 2);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (6, 'Cookies', TRUE, 2.99, 3);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (7, 'Tablet', TRUE, 299.99, 1);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (8, 'Pants', FALSE, 39.99, 2);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (9, 'Cereal', TRUE, 4.99, 3);
  INSERT IGNORE INTO products (productCode, description, productPurchased, salePrice, typeCode) VALUES (10, 'Television', TRUE, 399.99, 1);

  INSERT IGNORE INTO sales (saleCode, amount, date) VALUES (1, 1078.97, '2024-08-01');
  INSERT IGNORE INTO sales (saleCode, amount, date) VALUES (2, 199.97, '2024-08-02');
  INSERT IGNORE INTO sales (saleCode, amount, date) VALUES (3, 405.96, '2024-08-03');

  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (1, 1, 1);  -- Smartphone
  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (1, 4, 1);  -- Laptop
  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (1, 10, 1); -- Television
  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (2, 2, 2);  -- Jeans
  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (3, 7, 2);  -- Tablet
  INSERT IGNORE INTO sale_detail (saleCode, productCode, quantity) VALUES (3, 3, 10); -- Chocolate
EOSQL
