const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
// const bcrypt = require('bcryptjs');

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
        unique: true,
    }
});

// {
//     hooks: {
//         beforeBulkCreate: (user) => {
//             if (user.password = user.password && user.password !== "") {
//                 console.log('Before Bulk Create');
//                 const salt = bcrypt.genSaltSync(10);
//                 user.password = bcrypt.hashSync(user.password, salt);
//             }
//             console.log('Before Bulk Create');
//             console.log(user);
//         },
//     }
// }

// User.addHook('beforeBulkCreate', (user) => {
//     console.log('Before Bulk Create');
//     console.log(user);
// });

// User.Role = User.belongsTo(Role);

module.exports = User;