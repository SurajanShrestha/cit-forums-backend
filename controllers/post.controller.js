const { postService } = require('../services');
const ApiError = require('../utils/apiError');

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        console.log('Posts not found. Error: ' + err);
        res.status(404).json({ message: 'Posts could not be found' });
    }
};

// Get specific posts by a certain TopicId using Query Parameters
const getPostsByTopicId = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { TopicId } = req.query;
        const posts = await postService.getPostsByTopicId(TopicId);
        res.json(posts);
    } catch (err) {
        console.log('Posts not found. Error: ' + err);
        res.status(404).json({ message: 'Posts could not be found' });
    }
};

// Get all posts ordered together with respect to topic title
const getPostsOrderedByTopicTitle = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const posts = await postService.getPostsOrderedByTopicTitle();
        res.json(posts);
    } catch (err) {
        console.log('Posts not found. Error: ' + err);
        res.status(404).json({ message: 'Posts could not be found' });
    }
};

// Create a post
const createPost = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        // const { content, likes } = req.body;
        const post = await postService.createPost(req.body);
        console.log('**Post successfully created with content: ' + req.body.content);
        res.json({ message: 'Post successfully created', post });
    } catch (err) {
        res.send('Error creating post');
        console.log('**Post could not be created. Error: ' + err);
        res.status(404).json({ message: 'Post could not be created' });
    }
};

// Get and Delete a single post via Primary Key
const deleteSinglePost = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { postId } = req.params;
        const post = await postService.deleteSinglePost(postId);
        console.log('**Post successfully deleted');
        res.status(200).json({ message: 'Deleted successfully', post });
    } catch (err) {
        console.log('Post could not be deleted. Error: ' + err);
        res.status(404).json({ message: 'Post could not be deleted' });
    }
};

// Get and Update a single post via Primary Key
const updateSinglePost = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { postId } = req.params;
        const post = await postService.updateSinglePost(postId, req.body);
        // In postService.updateSinglePost, we are updating Post and sending the updated Post data using findByPk method.
        if (post) {
            console.log('**Post successfully updated');
            res.json({ message: 'Post successfully updated', post });
        } else {
            throw new ApiError(404, 'Post not found');
        }
    } catch (err) {
        console.log('Post could not be updated. Error: ' + err);
        res.status(404).json({ message: 'Post could not be updated' });
    }
};

module.exports = {
    getAllPosts,
    getPostsByTopicId,
    getPostsOrderedByTopicTitle,
    createPost,
    deleteSinglePost,
    updateSinglePost,
};