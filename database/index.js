const { Sequelize } = require('sequelize');

// Database Setup
const sequelize = new Sequelize('citForumsDB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize
};