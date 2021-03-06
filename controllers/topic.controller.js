const { topicService } = require('../services');
const ApiError = require('../utils/apiError');

// Get all topics
const getAllTopics = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const topics = await topicService.getAllTopics();
        res.json(topics);
    } catch (err) {
        console.log('Topics not found. Error: ' + err);
        res.status(404).json({ message: 'Topics could not be found' });
    }
};

// Get a single topic via Primary Key
const getSingleTopic = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { topicId } = req.params;
        const topic = await topicService.getSingleTopic(topicId);
        res.json(topic);
    } catch (err) {
        console.log('Topic could not be found. Error: ' + err);
        res.status(404).json({ message: 'Topic could not be found' });
    }
};

// Get specific topics by a certain TopicId using Query Parameters
const getTopicsByCategoryId = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { CategoryId } = req.query;
        const topics = await topicService.getTopicsByCategoryId(CategoryId);
        res.json(topics);
    } catch (err) {
        console.log('Topics not found. Error: ' + err);
        res.status(404).json({ message: 'Topics could not be found' });
    }
};

// Get topics by similar topic titles
const getTopicsBySimilarTitles = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { title } = req.query;
        const topics = await topicService.getTopicsBySimilarTitles(title);
        res.json(topics);
    } catch (err) {
        console.log('Topics not found. Error: ' + err);
        res.status(404).json({ message: 'Topics could not be found' });
    }
};

// Get latest topics
const getLatestTopics = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { limit } = req.query;
        const topics = await topicService.getLatestTopics(limit);
        res.json(topics);
    } catch (err) {
        console.log('Topics not found. Error: ' + err);
        res.status(404).json({ message: 'Topics could not be found' });
    }
};

// Create a topic
const createTopic = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        // const { title } = req.body;
        const topic = await topicService.createTopic(req.body);
        console.log('**Topic successfully created with title: ' + req.body.title);
        res.json({ message: 'Topic successfully created', topic });
    } catch (err) {
        console.log('**Topic could not be created. Error: ' + err);
        res.status(404).json({ message: 'Topic could not be created' });
    }
};

// Get and Delete a single topic via Primary Key
const deleteSingleTopic = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { topicId } = req.params;
        const topic = await topicService.deleteSingleTopic(topicId);
        console.log('**Topic successfully deleted');
        res.status(200).json({ message: 'Deleted successfully', topic });
    } catch (err) {
        console.log('Topic could not be deleted. Error: ' + err);
        res.status(404).json({ message: 'Topic could not be deleted' });
    }
};

// Get and Update a single topic via Primary Key
const updateSingleTopic = async (req, res) => {
    try {
        console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
        const { topicId } = req.params;
        const topic = await topicService.updateSingleTopic(topicId, req.body);
        if (topic) {
            console.log('**Topic successfully updated');
            res.json({ message: 'Topic successfully updated', topic });
        } else {
            throw new ApiError(404, 'Topic not found');
        }
    } catch (err) {
        console.log('Topic could not be updated. Error: ' + err);
        res.status(404).json({ message: 'Topic could not be updated' });
    }
};

module.exports = {
    getAllTopics,
    getSingleTopic,
    getTopicsByCategoryId,
    getTopicsBySimilarTitles,
    getLatestTopics,
    createTopic,
    deleteSingleTopic,
    updateSingleTopic,
};