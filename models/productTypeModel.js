import connection from '../config/db.js';

export const getProductTypes = (callback) => {
    connection.query('SELECT * FROM product_types', callback);
};

export const getProductTypeById = (id, callback) => {
    connection.query('SELECT * FROM product_types WHERE TypeId = ?', [id], callback);
};

export const createProductType = (productType, callback) => {
    connection.query('INSERT INTO product_types SET ?', productType, callback);
};

export const updateProductType = (id, productType, callback) => {
    connection.query('UPDATE product_types SET ? WHERE TypeId = ?', [productType, id], callback);
};

export const deleteProductType = (id, callback) => {
    connection.query('DELETE FROM product_types WHERE TypeId = ?', [id], callback);
};
