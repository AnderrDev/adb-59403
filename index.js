import express from 'express';
import connection from './db.js';
import swaggerRouter from './swagger.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas

app.use('/api-docs', swaggerRouter); // Ruta para la documentación de Swagger

/**
 * @swagger
 * /:
 *   get:
 *     summary: Devuelve un mensaje de bienvenida
 *     responses:
 *       200:
 *         description: Un mensaje de bienvenida
 */
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Devuelve una lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CodProducto:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   productoComprado:
 *                     type: boolean
 *                   precioVenta:
 *                     type: number
 *                   CodTipo:
 *                     type: integer
 */
app.get('/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Devuelve un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CodProducto:
 *                   type: integer
 *                 descripcion:
 *                   type: string
 *                 productoComprado:
 *                   type: boolean
 *                 precioVenta:
 *                   type: number
 *                 CodTipo:
 *                   type: integer
 */
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM productos WHERE CodProducto = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]);
    });
});

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               productoComprado:
 *                 type: boolean
 *               precioVenta:
 *                 type: number
 *               CodTipo:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Tipo de producto no válido
 */
app.post('/productos', (req, res) => {
    const { descripcion, productoComprado, precioVenta, CodTipo } = req.body;

    // Verificar si el tipo de producto es válido
    connection.query('SELECT * FROM tipo_producto WHERE codTipo = ?', [CodTipo], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(400).send('Tipo de producto no válido');
        }

        // Insertar el nuevo producto si el tipo de producto es válido
        connection.query('INSERT INTO productos (descripcion, productoComprado, precioVenta, CodTipo) VALUES (?, ?, ?, ?)',
            [descripcion, productoComprado, precioVenta, CodTipo],
            (error, results) => {
                if (error) {
                    return res.status(500).send(error);
                }
                res.status(201).json({ id: results.insertId });
            });
    });
});

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
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
 *               descripcion:
 *                 type: string
 *               productoComprado:
 *                 type: boolean
 *               precioVenta:
 *                 type: number
 *               CodTipo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Tipo de producto no válido
 */
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion, productoComprado, precioVenta, CodTipo } = req.body;

    // Verificar si el tipo de producto es válido
    connection.query('SELECT * FROM tipo_producto WHERE codTipo = ?', [CodTipo], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(400).send('Tipo de producto no válido');
        }

        // Actualizar el producto si el tipo de producto es válido
        connection.query('UPDATE productos SET descripcion = ?, productoComprado = ?, precioVenta = ?, CodTipo = ? WHERE CodProducto = ?',
            [descripcion, productoComprado, precioVenta, CodTipo, id],
            (error) => {
                if (error) {
                    return res.status(500).send(error);
                }
                res.status(200).send('Producto actualizado exitosamente');
            });
    });
});

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
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
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM productos WHERE CodProducto = ?', [id], (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send('Producto eliminado exitosamente');
    });
});

/**
 * @swagger
 * /tipo_producto:
 *   get:
 *     summary: Devuelve una lista de tipos de productos
 *     responses:
 *       200:
 *         description: Lista de tipos de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codTipo:
 *                     type: integer
 *                   nombreTipo:
 *                     type: string
 */
app.get('/tipo_producto', (req, res) => {
    connection.query('SELECT * FROM tipo_producto', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

/**
 * @swagger
 * /tipo_producto/{id}:
 *   get:
 *     summary: Devuelve un tipo de producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un tipo de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codTipo:
 *                   type: integer
 *                 nombreTipo:
 *                   type: string
 */
app.get('/tipo_producto/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM tipo_producto WHERE codTipo = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]);
    });
});

/**
 * @swagger
 * /tipo_producto:
 *   post:
 *     summary: Crea un nuevo tipo de producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreTipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de producto creado exitosamente
 */
app.post('/tipo_producto', (req, res) => {
    const { nombreTipo } = req.body;
    connection.query('INSERT INTO tipo_producto (nombreTipo) VALUES (?)',
        [nombreTipo],
        (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.status(201).json({ id: results.insertId });
        });
});



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
