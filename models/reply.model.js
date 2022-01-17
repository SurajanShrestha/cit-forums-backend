const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Reply = sequelize.define('Reply', {
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 200],
        },
        allowNull: false,
    },
});

module.exports = Reply;