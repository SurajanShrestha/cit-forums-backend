const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);

router
    .route('/:categoryId')
    .get(categoryController.getSingleCategory)
    .delete(categoryController.deleteSingleCategory)
    .patch(categoryController.updateSingleCategory);

module.exports = router;