import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import productRoutes from './routes/productRoutes.js';
import productTypeRoutes from './routes/productTypeRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de la API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/products', productRoutes);
app.use('/api/product_types', productTypeRoutes);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
