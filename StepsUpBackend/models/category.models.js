const db = require('../config/db');

const Category = {
  getAll: (callback) => {
    db.query('SELECT * FROM category', callback);
  },

  create: (name, callback) => {
    db.query('INSERT INTO category (name) VALUES (?)', [name], callback);
  }
};

module.exports = Category;
