const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM product', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM product WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { category_id, type_id, title, description, price, sizes, main_img } = data;
    db.query(
      'INSERT INTO product (category_id, type_id, title, description, price, sizes, main_img) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [category_id, type_id, title, description, price, sizes, main_img],
      callback
    );
  },

  update: (id, data, callback) => {
    const { category_id, type_id, title, description, price, sizes, main_img } = data;
    db.query(
      'UPDATE product SET category_id=?, type_id=?, title=?, description=?, price=?, sizes=?, main_img=? WHERE id=?',
      [category_id, type_id, title, description, price, sizes, main_img, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM product WHERE id = ?', [id], callback);
  }
};

module.exports = Product;
