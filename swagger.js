import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentación',
            version: '1.0.0',
        },
    },
    apis: ['./index.js', './db.js'], // Archivos que contienen anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

export default router;
