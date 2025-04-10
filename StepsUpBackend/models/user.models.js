const db = require('../config/db');

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM user WHERE email = ?', [email], callback);
  },

  create: ({ email, phone, name, password }, callback) => {
    db.query(
      'INSERT INTO user (email, phone, name, password) VALUES (?, ?, ?, ?)',
      [email, phone, name, password],
      callback
    );
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM user WHERE id = ?', [id], callback);
  }
};

module.exports = User;
