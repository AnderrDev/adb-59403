import express from 'express';
import {
    getSaleDetailsController,
    createSaleDetailController,
    updateSaleDetailController,
    deleteSaleDetailController
} from '../controllers/saleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Detalles de Venta
 *   description: Gestión de detalles de venta
 */

/**
 * @swagger
 * /api/sales/{saleCode}/details:
 *   get:
 *     summary: Obtener los detalles de una venta
 *     tags: [Detalles de Venta]
 *     parameters:
 *       - in: path
 *         name: saleCode
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la venta obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   saleCode:
 *                     type: integer
 *                   productCode:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 */
router.get('/:saleCode/details', getSaleDetailsController);

/**
 * @swagger
 * /api/sales/{saleCode}/details:
 *   post:
 *     summary: Añadir un producto a una venta
 *     tags: [Detalles de Venta]
 *     parameters:
 *       - in: path
 *         name: saleCode
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productCode:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle de venta creado exitosamente
 */
router.post('/:saleCode/details', createSaleDetailController);

/**
 * @swagger
 * /api/sales/{saleCode}/details/{productCode}:
 *   put:
 *     summary: Actualizar un detalle de venta
 *     tags: [Detalles de Venta]
 *     parameters:
 *       - in: path
 *         name: saleCode
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productCode
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta actualizado exitosamente
 */
router.put('/:saleCode/details/:productCode', updateSaleDetailController);

/**
 * @swagger
 * /api/sales/{saleCode}/details/{productCode}:
 *   delete:
 *     summary: Eliminar un detalle de venta
 *     tags: [Detalles de Venta]
 *     parameters:
 *       - in: path
 *         name: saleCode
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productCode
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado exitosamente
 */
router.delete('/:saleCode/details/:productCode', deleteSaleDetailController);

export default router;
