const { categoryService } = require('../services');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.log('Categories not found. Error: ' + err);
        res.status(404).json({ message: 'Categories could not be found' });
    }
};

// Get a single category via Primary Key
const getSingleCategory = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { categoryId } = req.params;
        const category = await categoryService.getSingleCategory(categoryId);
        res.json(category);
    } catch (err) {
        console.log('Category not found. Error: ' + err);
        res.status(404).json({ message: 'Category could not be found' });
    }
};

// Create a category
const createCategory = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { name } = req.body;
        const category = await categoryService.createCategory(name);
        console.log('**Category successfully created with name: ' + name);
        res.json({ message: 'Category successfully created', category });
    } catch (err) {
        console.log('**Category could not be created. Error: ' + err);
        res.status(404).json({ message: 'Category could not be created' });
    }
};

// Get and Delete a single category via Primary Key
const deleteSingleCategory = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { categoryId } = req.params;
        const category = await categoryService.deleteSingleCategory(categoryId);
        console.log('**Category successfully deleted');
        res.status(200).json({ message: 'Deleted successfully', category });
    } catch (err) {
        console.log('Category could not be deleted. Error: ' + err);
        res.status(404).json({ message: 'Category could not be deleted' });
    }
};

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    deleteSingleCategory,
};