const express = require('express');
const { postController } = require('../controllers');

const router = express.Router();

// There can be only one get, post, delete, etc. on one router object.
router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/byTopicId')
    .get(postController.getPostsByTopicId);

router
    .route('/orderedByTopicTitle')
    .get(postController.getPostsOrderedByTopicTitle);

router
    .route('/:postId')
    .delete(postController.deleteSinglePost)
    .patch(postController.updateSinglePost);

module.exports = router;