const { Category, Topic, Post } = require('../models');

// Get all categories
const getAllCategories = async () => {
    // One to many or Many to one, include will Fetch all associations.
    const categories = await Category.findAll({
        include: [
            // Nested association. Posts inside associated Topics
            { model: Topic, include: [{ model: Post }] }
        ]
    });
    return categories;
};

// Get a single category via Primary Key
const getSingleCategory = async (primaryKey) => {
    const foundCategory = await Category.findByPk(primaryKey, { include: [Topic] });
    return foundCategory;
};

// Create/Register a category
const createCategory = async (name) => {
    const category = await Category.create({ name });
    return category;
};

// Get and Delete a single category via Primary Key
const deleteSingleCategory = async (primaryKey) => {
    const foundCategory = await Category.findByPk(primaryKey);
    const deletedCategory = await foundCategory.destroy();
    return deletedCategory;
};

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    deleteSingleCategory,
};