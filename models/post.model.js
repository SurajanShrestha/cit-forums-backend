const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Post = sequelize.define('Post', {
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 400],
        },
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Post;