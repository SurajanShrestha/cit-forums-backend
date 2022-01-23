const { Role } = require('../models');

// Get all roles
const getAllRoles = async () => {
    const roles = await Role.findAll();
    return roles;
};

// Create a role
const createRole = async (type) => {
    const role = await Role.create({
        type,
    });
    return role;
};

module.exports = {
    getAllRoles,
    createRole,
};