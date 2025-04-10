const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const product_types = await ProductType.create({name})
        return res.json(product_types)
    }

    async getAll(req, res) {
        const product_types = await Type.findAll()
        return res.json(product_types)
    }

}

module.exports = new TypeController()