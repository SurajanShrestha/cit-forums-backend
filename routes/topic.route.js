const express = require('express');
const { topicController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(topicController.getAllTopics)
    .post(topicController.createTopic);

router
    .route('/search')
    .get(topicController.getTopicsBySimilarTitles);

router
    .route('/latest')
    .get(topicController.getLatestTopics);

router
    .route('/byCategoryId')
    .get(topicController.getTopicsByCategoryId);

// Mostly the route params router will be kept at last to not override other routes in the same level
router
    .route('/:topicId')
    .get(topicController.getSingleTopic)
    .delete(topicController.deleteSingleTopic);

module.exports = router;