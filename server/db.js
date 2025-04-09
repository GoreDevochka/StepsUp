const { Sequelize } = require('sequelize')

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      authPlugins: 'mysql_native_password',
      connectTimeout: 10000
    },
    retry: {
      max: 5,
      match: [
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ESOCKETTIMEDOUT/,
        /EHOSTDOWN/
      ],
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
)

// Test connection
async function testConnection() {
  try {
    await db.authenticate()
    console.log('Database connection established successfully')
  } catch (error) {
    console.error('Unable to connect to database:', error)
    process.exit(1)
  }
}

testConnection()

module.exports = db
