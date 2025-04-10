const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Получить все типы
router.get('/', (req, res) => {
  db.query('SELECT * FROM type', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Добавить тип
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO type (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Type created', id: result.insertId });
  });
});

module.exports = router;
