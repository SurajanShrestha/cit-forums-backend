const express = require('express');
const { topicController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(topicController.getAllTopics)
    .post(topicController.createTopic);

router
    .route('/:topicId')
    .delete(topicController.deleteSingleTopic);

module.exports = router;