const express = require('express');
const router = express.Router();
const db = require('../config/db');
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;


// Получить все товары
router.get('/', (req, res) => {
  db.query('SELECT * FROM product', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Получить товар по id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
});

// Добавить товар
router.post('/', (req, res) => {
  const { category_id, type_id, title, description, price, sizes, main_img } = req.body;
  db.query(
    'INSERT INTO product (category_id, type_id, title, description, price, sizes, main_img) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [category_id, type_id, title, description, price, sizes, main_img],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Product created', id: result.insertId });
    }
  );
});

// Обновить товар
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category_id, type_id, title, description, price, sizes, main_img } = req.body;
  db.query(
    'UPDATE product SET category_id=?, type_id=?, title=?, description=?, price=?, sizes=?, main_img=? WHERE id=?',
    [category_id, type_id, title, description, price, sizes, main_img, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product updated' });
    }
  );
});

// Удалить товар
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM product WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;
