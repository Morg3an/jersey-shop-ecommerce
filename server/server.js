require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');
const morgan = require('morgan');

const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://jersey-shop-ecommerce.vercel.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Explicitly allow frontend origin
        credentials: true,               // Allow cookies, tokens, etc.
    })
);
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);
app.use(helmet());
app.use(morgan('dev'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));