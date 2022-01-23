const { roleService } = require('../services');

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (err) {
        console.log('Roles not found. Error: ' + err);
        res.status(404).json({ message: 'Roles could not be found' });
    }
};

// Create a role
const createRole = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { type } = req.body;
        const role = await roleService.createRole(type);
        console.log('**Role successfully created with type: ' + type);
        res.json({ message: 'Role successfully created', role });
    } catch (err) {
        console.log('**Role could not be created. Error: ' + err);
        res.status(404).json({ message: 'Roles could not be created' });
    }
};

module.exports = {
    getAllRoles,
    createRole,
};