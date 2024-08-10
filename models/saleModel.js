import connection from '../config/db.js';

export const getSales = (callback) => {
    connection.query('SELECT * FROM sales', callback);
};

export const getSaleById = (id, callback) => {
    connection.query('SELECT * FROM sales WHERE saleCode = ?', [id], callback);
};

export const createSale = (sale, callback) => {
    connection.query('INSERT INTO sales SET ?', sale, callback);
};

export const updateSale = (id, sale, callback) => {
    connection.query('UPDATE sales SET ? WHERE saleCode = ?', [sale, id], callback);
};

export const deleteSale = (id, callback) => {
    connection.query('DELETE FROM sales WHERE saleCode = ?', [id], callback);
};

export const getSaleDetails = (saleCode, callback) => {
    connection.query('SELECT * FROM sale_detail WHERE saleCode = ?', [saleCode], callback);
};

export const createSaleDetail = (saleDetail, callback) => {
    connection.query('INSERT INTO sale_detail SET ?', saleDetail, callback);
};

export const updateSaleDetail = (saleCode, productCode, saleDetail, callback) => {
    connection.query('UPDATE sale_detail SET ? WHERE saleCode = ? AND productCode = ?', [saleDetail, saleCode, productCode], callback);
};

export const deleteSaleDetail = (saleCode, productCode, callback) => {
    connection.query('DELETE FROM sale_detail WHERE saleCode = ? AND productCode = ?', [saleCode, productCode], callback);
};
