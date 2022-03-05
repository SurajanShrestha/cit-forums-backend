const { userService } = require('../services');
const ApiError = require('../utils/apiError');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        console.log('Users not found. Error: ' + err);
        res.status(404).json({ message: 'Users could not be found' });
    }
};

// Get a single user via Primary Key
const getSingleUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { userId } = req.params;
        const user = await userService.getSingleUser(userId);
        if (user) {
            res.json(user);
        } else {
            /*
            If user is not found, getSingleUser uses findByPk method which returns null instead of throwing error.
            So, we decided to throw our own error.
            */
            // This error is for our bash/terminal console. This error is caught by (err) argument in the catch block.
            throw new ApiError(404, 'User not found');
        }
    } catch (err) {
        console.log('User not found. Error: ' + err);
        res.status(404).json({ message: 'User could not be found' });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const user = await userService.loginUser(req.body);
        if (user) {
            res.json({ message: 'Login Successful', user });
        } else {
            throw new ApiError(404, 'User not found');
        }
    } catch (err) {
        console.log('User could not be logged in. Error: ' + err);
        res.status(404).json({ message: 'User could not be logged in' });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const user = await userService.loginAdmin(req.body);
        if (user) {
            res.json({ message: 'Login Successful', user });
        } else {
            throw new ApiError(404, 'Admin not found');
        }
    } catch (err) {
        console.log('Admin could not be logged in. Error: ' + err);
        res.status(404).json({ message: 'Admin could not be logged in' });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        // const { email, password, name, age, contact, RoleId } = req.body;
        const user = await userService.createUser(req.body);
        console.log('**User successfully created with email: ' + req.body.email);
        res.json({ message: 'User successfully created', user });
    } catch (err) {
        console.log('**User could not be created. Error: ' + err);
        res.status(404).json({ message: 'User could not be created' });
    }
};

// Get and Delete a single user via Primary Key
const deleteSingleUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { userId } = req.params;
        const user = await userService.deleteSingleUser(userId);
        console.log('**User successfully deleted');
        res.status(200).json({ message: 'Deleted successfully', user });
    } catch (err) {
        console.log('User could not be deleted. Error: ' + err);
        res.status(404).json({ message: 'User could not be deleted' });
    }
};

// Get and Update a single user via Primary Key
const updateSingleUser = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { userId } = req.params;
        const user = await userService.updateSingleUser(userId, req.body);
        // In userService.updateSingleUser, we are updating user and sending the updated user data using findByPk method.
        if (user) {
            console.log('**User successfully updated');
            res.json({ message: 'User successfully updated', user });
        } else {
            throw new ApiError(404, 'User not found');
        }
    } catch (err) {
        console.log('User could not be updated. Error: ' + err);
        res.status(404).json({ message: 'User could not be updated' });
    }
};

// Update Password
const updateUserPassword = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const user = await userService.updateUserPassword(req.body);
        // In userService.updateSingleUser, we are updating user and sending the updated user data using findByPk method.
        if (user) {
            console.log('**Password successfully updated');
            res.json({ message: 'Password successfully updated' });
        } else {
            throw new ApiError(404, 'User not found');
        }
    } catch (err) {
        console.log('Password could not be updated. Error: ' + err);
        res.status(404).json({ message: 'Password could not be updated' });
    }
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