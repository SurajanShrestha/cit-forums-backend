const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Role = sequelize.define('Role', {
    type: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 14],
        },
        allowNull: false,
        unique: true,
    },
});

module.exports = Role;