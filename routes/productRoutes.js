import express from 'express';
import {
    getProductsController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
} from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProductId:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   purchased:
 *                     type: boolean
 *                   salePrice:
 *                     type: number
 *                   TypeId:
 *                     type: integer
 */
router.get('/', getProductsController);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProductId:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 purchased:
 *                   type: boolean
 *                 salePrice:
 *                   type: number
 *                 TypeId:
 *                   type: integer
 */
router.get('/:id', getProductByIdController);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               salePrice:
 *                 type: number
 *               TypeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', createProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
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
 *               description:
 *                 type: string
 *               purchased:
 *                 type: boolean
 *               salePrice:
 *                 type: number
 *               TypeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
router.put('/:id', updateProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', deleteProductController);

export default router;
