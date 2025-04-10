const express = require('express');
const router = express.Router();
const db = require('../config/db');
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAll);
router.post('/', CategoryController.create);

module.exports = router;

// Получить все категории
router.get('/', (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Добавить категорию
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Category created', id: result.insertId });
  });
});

module.exports = router;
