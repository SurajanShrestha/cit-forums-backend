const { topicService } = require('../services');

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

module.exports = {
    getAllTopics,
    createTopic,
    deleteSingleTopic,
};