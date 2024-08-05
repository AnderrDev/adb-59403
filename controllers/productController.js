import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/productModel.js';

export const getProductsController = (req, res) => {
    getProducts((error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
};

export const getProductByIdController = (req, res) => {
    const { id } = req.params;
    getProductById(id, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]);
    });
};

export const createProductController = (req, res) => {
    const product = req.body;
    createProduct(product, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json({ id: results.insertId });
    });
};

export const updateProductController = (req, res) => {
    const { id } = req.params;
    const product = req.body;
    updateProduct(id, product, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Product updated successfully');
    });
};

export const deleteProductController = (req, res) => {
    const { id } = req.params;
    deleteProduct(id, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Product deleted successfully');
    });
};
