const Sequelize = require('sequelize')

const Database = new Sequelize(
    "ask_nodejs",
    "felipe",
    "root",
    { host: "localhost", dialect: "mysql" }
)

module.exports = Database