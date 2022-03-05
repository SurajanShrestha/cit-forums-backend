const { User, Topic, Post } = require('../models');

// Get all users
const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

// Get a single user via Primary Key
const getSingleUser = async (primaryKey) => {
    const user = await User.findByPk(primaryKey, {
        include: [
            {
                model: Post
            },
            // This is called nested include. We are getting posts and users associated with that certain topic
            {
                model: Topic,
                include: [Post, User]
            }
        ]
    });
    return user;
};

// Login/Find User by credentials
const loginUser = async (payload) => {
    const user = await User.findOne({
        where: {
            email: payload.email,
            password: payload.password
        }
    });
    return user;
};

// Login/Find Admin by credentials
const loginAdmin = async (payload) => {
    const user = await User.findOne({
        where: {
            email: payload.email,
            password: payload.password,
            RoleId: 1
        }
    });
    return user;
};

// Create/Register a user
const createUser = async (payload) => {
    const user = await User.create(payload);
    return user;
};

// Get and Delete a single user via Primary Key
const deleteSingleUser = async (primaryKey) => {
    const foundUser = await User.findByPk(primaryKey);
    const deletedUser = await foundUser.destroy();
    return deletedUser;
};

// Get and Update a single user via Primary Key
const updateSingleUser = async (primaryKey, updatePayload) => {
    // const foundUser = await User.findByPk(primaryKey);
    // const updatedUser = await foundUser.update({...foundUser, updatePayload });
    // const updatedUser = await foundUser.update({ updatePayload });
    const updatedUser = await User.update(updatePayload, {
        where: {
            id: primaryKey
        }
    });
    if (updatedUser) {
        const foundUpdatedUser = await User.findByPk(primaryKey);
        return foundUpdatedUser;
    }
    return null;
};

// Update user password
const updateUserPassword = async (payload) => {
    // const foundUser = await User.findByPk(primaryKey);
    // const updatedUser = await foundUser.update({...foundUser, updatePayload });
    // const updatedUser = await foundUser.update({ updatePayload });

    // const updatedUser = await User.update(updatePayload, {
    //     where: {
    //         id: primaryKey
    //     }
    // });
    const { userId, oldPassword, newPassword } = payload;
    console.log(userId);
    const foundUser = await User.findOne({
        where: {
            id: userId,
            password: oldPassword
        }
    });
    if (foundUser) {
        const updatedUser = await foundUser.update({ ...foundUser, password: newPassword });
        return updatedUser;
    }
    return null;
};

module.exports = {
    getAllUsers,
    getSingleUser,
    loginUser,
    loginAdmin,
    createUser,
    deleteSingleUser,
    updateSingleUser,
    updateUserPassword,
};