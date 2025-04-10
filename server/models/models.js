const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const users = sequelize.define ('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING, allowNull: false},

})
const carts = sequelize.define ('carts', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const cart_items = sequelize.define ('cart_items', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const products = sequelize.define ('products', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, unique: false, allowNull: false},
    price: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    available_sizes: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})
const product_types = sequelize.define ('product_types', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const categories = sequelize.define ('categories', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const roles = sequelize.define ('roles', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, unique: false, allowNull: false},
})
const product_images = sequelize.define ('product_images', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING, unique: false, allowNull: false},
})

// User relationships
users.hasOne(carts)
carts.belongsTo(users)

users.belongsTo(roles)
roles.hasMany(users)

// Cart relationships
carts.hasMany(cart_items)
cart_items.belongsTo(carts)

cart_items.belongsTo(products)
products.hasMany(cart_items)

// Product relationships
products.belongsTo(categories,)
categories.hasMany(products)

products.belongsTo(product_types)
product_types.hasMany(products)

products.hasMany(product_images)
product_images.belongsTo(products)

// Additional explicit foreign keys
product_images.belongsTo(products)
