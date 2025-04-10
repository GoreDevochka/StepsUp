const Category = require('../models/category.models');

const CategoryController = {
  getAll: (req, res) => {
    Category.getAll((err, results) => {
      if (err) return res.status(500).json({ error: 'Ошибка получения категорий' });
      res.json(results);
    });
  },

  create: (req, res) => {
    const { name } = req.body;

    Category.create(name, (err, result) => {
      if (err) return res.status(500).json({ error: 'Ошибка создания категории' });
      res.status(201).json({ message: 'Категория создана', id: result.insertId });
    });
  }
};

module.exports = CategoryController;
