import express from 'express';
import {
    getSalesController,
    getSaleByIdController,
    createSaleController,
    updateSaleController,
    deleteSaleController,
    getSaleDetailsController,
    createSaleDetailController,
    updateSaleDetailController,
    deleteSaleDetailController
} from '../controllers/saleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Gestión de ventas
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de todas las ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   saleCode:
 *                     type: integer
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 */
router.get('/', getSalesController);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saleCode:
 *                   type: integer
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 */
router.get('/:id', getSaleByIdController);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 */
router.post('/', createSaleController);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualizar una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 */
router.put('/:id', updateSaleController);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Eliminar una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 */
router.delete('/:id', deleteSaleController);

export default router;
