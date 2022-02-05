const { Topic, User, Post, Category } = require('../models');

// Get all topics
const getAllTopics = async () => {
    // const topics = await Topic.findAll();
    // return topics;
    /*
    Also fetches the user and post associated with the topic and returns an object
    containing all topic data along with user and post data in a "User": {//data} and "Posts": {//data} objects.
    Here, "Posts" is there instead of "Post" which explains our One to Many relation of Topic with Post.
    */
    const topics = await Topic.findAll({ include: [User, Post] });
    return topics;
};

// Get a single topic via Primary Key
const getSingleTopic = async (primaryKey) => {
    const foundTopic = await Topic.findByPk(primaryKey, { include: [Category, Post] });
    return foundTopic;
};

// Get a topics via Category Id
const getTopicsByCategoryId = async (catId) => {
    const foundTopics = await Topic.findAll({
        where: {
            CategoryId: catId
        },
        include: [User, Post]
    });
    return foundTopics;
};

// Create/Register a topic
const createTopic = async (payload) => {
    const topic = await Topic.create(payload);
    return topic;
};

// Get and Delete a single topic via Primary Key
const deleteSingleTopic = async (primaryKey) => {
    const foundTopic = await Topic.findByPk(primaryKey);
    const deletedTopic = await foundTopic.destroy();
    return deletedTopic;
};

module.exports = {
    getAllTopics,
    getSingleTopic,
    getTopicsByCategoryId,
    createTopic,
    deleteSingleTopic,
};