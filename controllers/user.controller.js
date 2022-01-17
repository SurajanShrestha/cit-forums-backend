const { userService } = require('../services');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        console.log('Users not found. Error: ' + err);
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { email, password, name, age, contact, RoleId } = req.body;
        const user = await userService.createUser(email, password, name, age, contact, RoleId);
        console.log('**User successfully created with email: ' + email);
        res.json(user);
    } catch (err) {
        res.send('Error creating user');
        console.log('**User could not be created. Error: ' + err);
    }
};

module.exports = {
    getAllUsers,
    createUser,
};