const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Topic = sequelize.define('Topic', {
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 200],
        },
        allowNull: false,
        unique: true,
    },
});

module.exports = Topic;