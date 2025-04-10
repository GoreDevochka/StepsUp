const Router = require('express')
const router = new Router()

router.post('/registration', (req, res) => res.send('Registration route'))
router.post('/login', (req, res) => res.send('Login route'))
router.get('/auth', (req, res) => res.send('Auth route'))

module.exports = router;
