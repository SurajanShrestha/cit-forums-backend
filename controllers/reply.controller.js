const { replyService } = require('../services');
const ApiError = require('../utils/apiError');

// Get all replies
const getAllReplies = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const replies = await replyService.getAllReplies();
        res.json(replies);
    } catch (err) {
        console.log('Replies not found. Error: ' + err);
        res.status(404).json({ message: 'Replies could not be found' });
    }
};

// Get a single reply via Primary Key
const getSingleReply = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { replyId } = req.params;
        const reply = await replyService.getSingleReply(replyId);
        if (reply) {
            res.json(reply);
        } else {
            throw new ApiError(404, 'Reply not found');
        }
    } catch (err) {
        console.log('Reply not found. Error: ' + err);
        res.status(404).json({ message: 'Reply could not be found' });
    }
};

// Get specific replies by a certain PostId using Query Parameters
const getRepliesByPostId = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { PostId } = req.query;
        const replies = await replyService.getRepliesByPostId(PostId);
        res.json(replies);
    } catch (err) {
        console.log('Replies not found. Error: ' + err);
        res.status(404).json({ message: 'Replies could not be found' });
    }
};

// Get all replies ordered together with respect to post title
const getRepliesOrderedByPostTitle = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const replies = await replyService.getRepliesOrderedByPostTitle();
        res.json(replies);
    } catch (err) {
        console.log('Replies not found. Error: ' + err);
        res.status(404).json({ message: 'Replies could not be found' });
    }
};

// Create a reply
const createReply = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        // const { content, likes } = req.body;
        const reply = await replyService.createReply(req.body);
        console.log('**Reply successfully created with content: ' + req.body.content);
        res.json({ message: 'Role successfully created', reply });
    } catch (err) {
        res.send('Error creating reply');
        console.log('**Reply could not be created. Error: ' + err);
        res.status(404).json({ message: 'Reply could not be created' });
    }
};

// Get and Delete a single reply via Primary Key
const deleteSingleReply = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { replyId } = req.params;
        const reply = await replyService.deleteSingleReply(replyId);
        console.log('**Reply successfully deleted');
        res.status(200).json({ message: 'Deleted successfully', reply });
    } catch (err) {
        console.log('Reply could not be deleted. Error: ' + err);
        res.status(404).json({ message: 'Reply could not be deleted' });
    }
};

// Get and Update a single reply via Primary Key
const updateSingleReply = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { replyId } = req.params;
        const reply = await replyService.updateSingleReply(replyId, req.body);
        // In replyService.updateSingleReply, we are updating Reply and sending the updated Reply data using findByPk method.
        if (reply) {
            console.log('**Reply successfully updated');
            res.json({ message: 'Reply successfully updated', reply });
        } else {
            throw new ApiError(404, 'Reply not found');
        }
    } catch (err) {
        console.log('Reply could not be updated. Error: ' + err);
        res.status(404).json({ message: 'Reply could not be updated' });
    }
};

module.exports = {
    getAllReplies,
    getSingleReply,
    getRepliesByPostId,
    getRepliesOrderedByPostTitle,
    createReply,
    deleteSingleReply,
    updateSingleReply,
};