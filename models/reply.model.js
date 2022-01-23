const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Reply = sequelize.define('Reply', {
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 200],
        },
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    replyToId: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Reply;