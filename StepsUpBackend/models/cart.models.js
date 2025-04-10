const db = require('../config/db');

const Cart = {
  getCartByUserId: (user_id, callback) => {
    db.query(
      `SELECT ci.id, ci.product_id, ci.size, ci.quantity, p.title, p.price
       FROM cart c
       JOIN cart_items ci ON c.id = ci.cart_id
       JOIN product p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [user_id],
      callback
    );
  },

  addToCart: ({ user_id, product_id, size, quantity }, callback) => {
    // Получаем cart_id для пользователя или создаем корзину, если нет
    db.query('SELECT id FROM cart WHERE user_id = ?', [user_id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) {
        // Создаем корзину
        db.query('INSERT INTO cart (user_id) VALUES (?)', [user_id], (err, result) => {
          if (err) return callback(err);
          const cart_id = result.insertId;
          insertItem(cart_id);
        });
      } else {
        const cart_id = results[0].id;
        insertItem(cart_id);
      }

      function insertItem(cart_id) {
        db.query(
          'INSERT INTO cart_items (cart_id, product_id, size, quantity) VALUES (?, ?, ?, ?)',
          [cart_id, product_id, size, quantity],
          callback
        );
      }
    });
  },

  removeFromCart: (item_id, callback) => {
    db.query('DELETE FROM cart_items WHERE id = ?', [item_id], callback);
  }
};

module.exports = Cart;
