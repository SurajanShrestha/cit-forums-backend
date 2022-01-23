const express = require('express');
const { replyController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(replyController.getAllReplies)
    .post(replyController.createReply);

router
    .route('/:replyId')
    .delete(replyController.deleteSingleReply)
    .patch(replyController.updateSingleReply);

module.exports = router;