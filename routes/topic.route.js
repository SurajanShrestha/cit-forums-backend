const express = require('express');
const { topicController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(topicController.getAllTopics)
    .post(topicController.createTopic);

router
    .route('/byCategoryId')
    .get(topicController.getTopicsByCategoryId);

router
    .route('/:topicId')
    .get(topicController.getSingleTopic)
    .delete(topicController.deleteSingleTopic);

module.exports = router;