const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const bcrypt = require('bcryptjs');

// Define Modals
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [6, 100],
        },
        allowNull: false,
        // set(value){
        //     const salt = bcrypt.genSaltSync(2);
        //     const hash = bcrypt.hashSync(value, salt);
        //     this.setDataValue('password', hash);
        // }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [6, 35],
        },
        allowNull: false
    },
    age: {
        type: DataTypes.SMALLINT,
        validate: {
            min: 16,
        },
        allowNull: false,
    },
    contact: {
        type: DataTypes.INTEGER,
        validate: {
            len: [10, 10]
        },
        allowNull: false,
        // unique: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

/* 
    Only those hooks which have a name can be removed/deleted (if we want to delete them). 
    So we gave this hook a name: "hashNewUserPassword"
*/
User.addHook('beforeCreate', 'hashUserPwBeforeCreate', (user) => {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(user?.password, salt);
    user.password = hashedPassword;
});

// ** IMPORTANT REM: For User.update, beforeBulkUpdate is triggered. **

// For User.findOne and then calling foundUser.update, beforeUpdate is triggered.
// Runs just before User Password Update.
User.addHook('beforeUpdate', 'hashUserPwBeforePwUpdate', (user) => {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(user?.password, salt);
    user.password = hashedPassword;
});

module.exports = User;