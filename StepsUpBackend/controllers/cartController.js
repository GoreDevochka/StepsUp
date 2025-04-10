const pool = require('../config/db');

// Получить корзину пользователя
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Найти корзину
    const [carts] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
    if (carts.length === 0) return res.json({ items: [] });

    const cartId = carts[0].id;

    const [items] = await pool.query(`
      SELECT ci.id, ci.product_id, p.title, p.price, ci.size, ci.quantity, p.main_img
      FROM cart_items ci
      JOIN product p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `, [cartId]);

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении корзины' });
  }
};

// Добавить товар в корзину
const addToCart = async (req, res) => {
  const { product_id, size, quantity } = req.body;

  try {
    const userId = req.user.id;

    // Найти или создать корзину
    let [carts] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
    let cartId;

    if (carts.length === 0) {
      const [result] = await pool.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
      cartId = result.insertId;
    } else {
      cartId = carts[0].id;
    }

    // Проверить, есть ли уже такой товар с таким размером в корзине
    const [existingItems] = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?',
      [cartId, product_id, size]
    );

    if (existingItems.length > 0) {
      // Обновить количество
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
        [quantity, existingItems[0].id]
      );
    } else {
      // Вставить новый товар
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, size, quantity) VALUES (?, ?, ?, ?)',
        [cartId, product_id, size, quantity]
      );
    }

    res.json({ message: 'Товар добавлен в корзину' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при добавлении в корзину' });
  }
};

// Удалить товар из корзины
const removeFromCart = async (req, res) => {
  const itemId = req.params.id;

  try {
    await pool.query('DELETE FROM cart_items WHERE id = ?', [itemId]);
    res.json({ message: 'Товар удалён из корзины' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при удалении товара' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};
