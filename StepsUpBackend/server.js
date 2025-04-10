const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const typeRoutes = require('./routes/type');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: 'http://localhost:5173', // Указываем фронтенд
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
  allowedHeaders: ['Content-Type', 'Authorization'] // Разрешенные заголовки
};
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/types', typeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
});
