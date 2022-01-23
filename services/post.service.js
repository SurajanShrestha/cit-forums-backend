const { Post } = require('../models');

// Get all posts
const getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
};

// Create/Register a post
const createPost = async (payload) => {
    const post = await Post.create(payload);
    return post;
};

// Get and Delete a single post via Primary Key
const deleteSinglePost = async (primaryKey) => {
    const foundPost = await Post.findByPk(primaryKey);
    const deletedPost = await foundPost.destroy();
    return deletedPost;
};

// Get and Update a single post via Primary Key
const updateSinglePost = async (primaryKey, updatePayload) => {
    const updatedPost = await Post.update(updatePayload, {
        where: {
            id: primaryKey
        }
    });
    if (updatedPost) {
        const foundUpdatedPost = await Post.findByPk(primaryKey);
        return foundUpdatedPost;
    }
    return null;
};

module.exports = {
    getAllPosts,
    createPost,
    deleteSinglePost,
    updateSinglePost,
};