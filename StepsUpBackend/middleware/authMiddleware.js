// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = req.header('Authorization')?.split(' ')[1]; // обязательно [1] — иначе вся строка уйдёт как токен

  if (!token) return res.sendStatus(401); // без токена

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // токен не валидный
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
