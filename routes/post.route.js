const express = require('express');
const { postController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/:postId')
    .delete(postController.deleteSinglePost)
    .patch(postController.updateSinglePost);

module.exports = router;