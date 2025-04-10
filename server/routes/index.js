const Router = require('express').Router;
const router = new Router()
const CategoryRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')
const UserRouter = require('./UserRouter')
const TypeRouter = require('./TypeRouter')

router.use ('/users', UserRouter)
router.use ('/product_types', TypeRouter)
router.use ('/products', ProductRouter)
router.use ('/categories', CategoryRouter)

module.exports = router;