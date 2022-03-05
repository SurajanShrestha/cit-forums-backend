const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/login/admin')
    .post(userController.loginAdmin);

router
    .route('/login')
    .post(userController.loginUser);

router
    .route('/updatePw')
    .post(userController.updateUserPassword);

router
    .route('/:userId')
    .get(userController.getSingleUser)
    .delete(userController.deleteSingleUser)
    .patch(userController.updateSingleUser);

module.exports = router;