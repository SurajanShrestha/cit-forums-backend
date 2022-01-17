const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

module.exports = router;