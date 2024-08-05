import express from 'express';
import {
    getProductTypesController,
    getProductTypeByIdController,
    createProductTypeController,
    updateProductTypeController,
    deleteProductTypeController
} from '../controllers/productTypeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipos de Producto
 *   description: Gestión de tipos de producto
 */

/**
 * @swagger
 * /api/product_types:
 *   get:
 *     summary: Obtener todos los tipos de producto
 *     tags: [Tipos de Producto]
 *     responses:
 *       200:
 *         description: Lista de todos los tipos de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TypeId:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', getProductTypesController);

/**
 * @swagger
 * /api/product_types/{id}:
 *   get:
 *     summary: Obtener un tipo de producto por ID
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo tipo de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 TypeId:
 *                   type: integer
 *                 name:
 *                   type: string
 */
router.get('/:id', getProductTypeByIdController);

/**
 * @swagger
 * /api/product_types:
 *   post:
 *     summary: Crear un nuevo tipo de producto
 *     tags: [Tipos de Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de producto creado exitosamente
 */
router.post('/', createProductTypeController);

/**
 * @swagger
 * /api/product_types/{id}:
 *   put:
 *     summary: Actualizar un tipo de producto por ID
 *     tags: [Tipos de Producto]
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de producto actualizado exitosamente
 */
router.put('/:id', updateProductTypeController);

/**
 * @swagger
 * /api/product_types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de producto por ID
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de producto eliminado exitosamente
 */
router.delete('/:id', deleteProductTypeController);

export default router;
