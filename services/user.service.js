const { User } = require('../models');

// Get all users
const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

// Create/Register a user
const createUser = async (email, password, name, age, contact, RoleId) => {
    const user = await User.create({
        email,
        password,
        name,
        age,
        contact,
        RoleId,
    });
    return user;
};

module.exports = {
    getAllUsers,
    createUser,
};