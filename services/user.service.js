const { User, Topic, Post } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT } = require('../config');

// Get all users
const getAllUsers = async (headers) => {
    try {
        let bearerToken = headers?.authorization.split(' ')[1];
        // If jwt.verify fails then immediately catch block executes.
        let decodedToken = jwt.verify(bearerToken, JWT.secret);
        if (decodedToken) {
            const users = await User.findAll();
            return users;
        }
    } catch (err) {
        if (err?.name === "JsonWebTokenError")
            throw "Authentication Failed";
        else
            throw "Users could not be found";
    }
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
            RoleId: 2
        }
    });
    if (user) {
        if (bcrypt.compareSync(payload?.password, user?.password)) {
            const token = jwt.sign({ id: user?.id, email: user?.email }, JWT.secret);
            return { ...user, token };
            // return user;
        }
        else
            throw "Password does not match";
    } else {
        throw "User does not exist";
    }
};

// Login/Find Admin by credentials
const loginAdmin = async (payload) => {
    const user = await User.findOne({
        where: {
            email: payload.email,
            RoleId: 1
        }
    });
    if (user) {
        if (bcrypt.compareSync(payload?.password, user?.password)) {
            const token = jwt.sign({ id: user?.id, email: user?.email }, JWT.secret);
            return { ...user, token };
            // return user;
        }
        else
            throw "Password does not match";
    } else {
        throw "User does not exist";
    }
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
    const { userId, oldPassword, newPassword } = payload;
    const foundUser = await User.findOne({
        where: {
            id: userId,
            // password: oldPassword
        }
    });
    if (foundUser) {
        /*
            foundUser?.password.length < 40 this code was for when I had just actual password stored in the database.
            And I wanted to change it by calling the /users/updatePw api.
        */
        if (bcrypt.compareSync(oldPassword, foundUser?.password) || foundUser?.password.length < 40) {
            const updatedUser = await foundUser.update({ ...foundUser, password: newPassword });
            return updatedUser;
        }
        else
            throw "Old Password does not match";
    } else {
        throw "User does not exist";
    }
    // if (foundUser) {
    //     const updatedUser = await foundUser.update({ ...foundUser, password: newPassword });
    //     return updatedUser;
    // }
    // return null;
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