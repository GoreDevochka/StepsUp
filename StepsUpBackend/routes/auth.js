// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();
const db = require('../config/db'); // путь к твоему файлу с подключением к MySQL
const authenticateToken = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const secret = process.env.JWT_SECRET;

// Регистрация

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const [existing] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO user (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, hashedPassword]
    );

    const user = { id: result.insertId, name, email, phone };
    const token = jwt.sign(user, secret, { expiresIn: '1d' });
    console.log(token);

    res.json({ user, accessToken: token });

 } catch (err) {
  console.error('Ошибка при регистрации:', err.message);
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

});


// Авторизация
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/me', authenticateToken, userController.getCurrentUser);
console.log('authMiddleware =', authenticateToken); // Должно быть: [Function: authenticateToken]

module.exports = router;
