import { getSales, getSaleById, createSale, updateSale, deleteSale, getSaleDetails, createSaleDetail, updateSaleDetail, deleteSaleDetail } from '../models/saleModel.js';

export const getSalesController = (req, res) => {
    getSales((error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
};

export const getSaleByIdController = (req, res) => {
    const { id } = req.params;
    getSaleById(id, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]);
    });
};

export const createSaleController = (req, res) => {
    const sale = req.body;
    createSale(sale, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json({ id: results.insertId });
    });
};

export const updateSaleController = (req, res) => {
    const { id } = req.params;
    const sale = req.body;
    updateSale(id, sale, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Sale updated successfully');
    });
};

export const deleteSaleController = (req, res) => {
    const { id } = req.params;
    deleteSale(id, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Sale deleted successfully');
    });
};

export const getSaleDetailsController = (req, res) => {
    const { saleCode } = req.params;
    getSaleDetails(saleCode, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
};

export const createSaleDetailController = (req, res) => {
    const saleDetail = req.body;
    createSaleDetail(saleDetail, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json({ saleCode: results.insertId });
    });
};

export const updateSaleDetailController = (req, res) => {
    const { saleCode, productCode } = req.params;
    const saleDetail = req.body;
    updateSaleDetail(saleCode, productCode, saleDetail, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Sale detail updated successfully');
    });
};

export const deleteSaleDetailController = (req, res) => {
    const { saleCode, productCode } = req.params;
    deleteSaleDetail(saleCode, productCode, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Sale detail deleted successfully');
    });
};
