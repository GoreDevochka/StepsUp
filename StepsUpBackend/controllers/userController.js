// Этот файл после правки выглядит корректно 👇

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.register = async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (email, password, name, phone) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, phone || null]
    );

    const user = {
      id: result.insertId,
      email,
      name,
    };

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, user });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
exports.getCurrentUser = (req, res) => {
  res.json(req.user); // req.user устанавливается в middleware authenticateToken
};

