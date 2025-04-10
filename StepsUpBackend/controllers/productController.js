const Product = require('../models/product.models');

const ProductController = {
  getAll: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: 'Ошибка получения товаров' });
      res.json(results);
    });
  },

  getOne: (req, res) => {
    const { id } = req.params;

    Product.getById(id, (err, results) => {
      if (err || results.length === 0)
        return res.status(404).json({ error: 'Товар не найден' });

      res.json(results[0]);
    });
  },

  create: (req, res) => {
    Product.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Ошибка добавления товара' });
      res.status(201).json({ message: 'Товар добавлен', id: result.insertId });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    Product.update(id, req.body, (err) => {
      if (err) return res.status(500).json({ error: 'Ошибка обновления' });
      res.json({ message: 'Товар обновлен' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err) => {
      if (err) return res.status(500).json({ error: 'Ошибка удаления' });
      res.json({ message: 'Товар удален' });
    });
  }
};

module.exports = ProductController;
