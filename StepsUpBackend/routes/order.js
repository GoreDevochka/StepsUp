const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware для авторизации
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Нет токена' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};

// 📦 Создать заказ из корзины
router.post('/create', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Получить корзину
    const [cartRows] = await connection.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
    if (cartRows.length === 0) throw new Error('Корзина пуста');

    const cartId = cartRows[0].id;

    // Получить товары из корзины
    const [cartItems] = await connection.query(`
      SELECT ci.*, p.price
      FROM cart_items ci
      JOIN product p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `, [cartId]);

    if (cartItems.length === 0) throw new Error('Корзина пуста');

    // Подсчитать общую сумму
    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Создать заказ
    const [orderResult] = await connection.query(
      'INSERT INTO `order` (user_id, total, status) VALUES (?, ?, ?)',
      [userId, total, 'pending']
    );

    const orderId = orderResult.insertId;

    // Добавить позиции заказа
    for (const item of cartItems) {
      await connection.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `, [orderId, item.product_id, item.quantity, item.price]);
    }

    // Очистить корзину
    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

    await connection.commit();
    res.json({ message: 'Заказ успешно создан', orderId });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: err.message || 'Ошибка при создании заказа' });
  } finally {
    connection.release();
  }
});

// 📜 Получить список заказов пользователя
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const [orders] = await pool.query('SELECT * FROM `order` WHERE user_id = ? ORDER BY id DESC', [userId]);
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении заказов' });
  }
});

// 📄 Получить детали конкретного заказа
router.get('/:id', authMiddleware, async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  try {
    const [order] = await pool.query('SELECT * FROM `order` WHERE id = ? AND user_id = ?', [orderId, userId]);
    if (order.length === 0) return res.status(404).json({ message: 'Заказ не найден' });

    const [items] = await pool.query(`
      SELECT oi.*, p.title, p.main_img
      FROM order_items oi
      JOIN product p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [orderId]);

    res.json({ order: order[0], items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении деталей заказа' });
  }
});

module.exports = router;
