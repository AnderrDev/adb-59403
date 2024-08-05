import { getProductTypes, getProductTypeById, createProductType, updateProductType, deleteProductType } from '../models/productTypeModel.js';

export const getProductTypesController = (req, res) => {
    getProductTypes((error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
};

export const getProductTypeByIdController = (req, res) => {
    const { id } = req.params;
    getProductTypeById(id, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]);
    });
};

export const createProductTypeController = (req, res) => {
    const productType = req.body;
    createProductType(productType, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json({ id: results.insertId });
    });
};

export const updateProductTypeController = (req, res) => {
    const { id } = req.params;
    const productType = req.body;
    updateProductType(id, productType, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Product type updated successfully');
    });
};

export const deleteProductTypeController = (req, res) => {
    const { id } = req.params;
    deleteProductType(id, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Product type deleted successfully');
    });
};
