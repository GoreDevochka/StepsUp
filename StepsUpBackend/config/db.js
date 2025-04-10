const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // или 127.0.0.1
  user: 'root',           // или твой пользователь
  password: '',   // пароль
  database: 'stepsup',    // имя базы данных
});

module.exports = pool;
