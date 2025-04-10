const express = require('express');
const router = express.Router();

// Пример: Получение содержимого корзины
router.get('/cart', (req, res) => {
  // Здесь можно добавить логику для получения корзины из базы данных
  res.json({ message: 'Корзина успешно получена' });
});

// Пример: Добавление товара в корзину
router.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;

  // Логика добавления товара в корзину, например, в базу данных
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Не указаны все данные товара' });
  }

  // Если все данные корректны, возвращаем успех
  res.status(201).json({ message: 'Товар добавлен в корзину', productId, quantity });
});

// Пример: Удаление товара из корзины
router.delete('/cart/:productId', (req, res) => {
  const { productId } = req.params;

  // Логика удаления товара из корзины (например, из базы данных)
  if (!productId) {
    return res.status(400).json({ error: 'Не указан ID товара' });
  }

  // Удаляем товар и подтверждаем удаление
  res.status(200).json({ message: `Товар с ID ${productId} удален из корзины` });
});

// Экспорт маршрутов
module.exports = router;
