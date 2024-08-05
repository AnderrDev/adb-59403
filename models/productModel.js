import connection from '../config/db.js';

export const getProducts = (callback) => {
    connection.query('SELECT * FROM products', callback);
};

export const getProductById = (id, callback) => {
    connection.query('SELECT * FROM products WHERE ProductId = ?', [id], callback);
};

export const createProduct = (product, callback) => {
    connection.query('INSERT INTO products SET ?', product, callback);
};

export const updateProduct = (id, product, callback) => {
    connection.query('UPDATE products SET ? WHERE ProductId = ?', [product, id], callback);
};

export const deleteProduct = (id, callback) => {
    connection.query('DELETE FROM products WHERE ProductId = ?', [id], callback);
};
