const { Reply } = require('../models');

// Get all replies
const getAllReplies = async () => {
    const replies = await Reply.findAll();
    return replies;
};

// Create/Register a reply
const createReply = async (payload) => {
    const reply = await Reply.create(payload);
    return reply;
};

// Get and Delete a single reply via Primary Key
const deleteSingleReply = async (primaryKey) => {
    const foundReply = await Reply.findByPk(primaryKey);
    const deletedReply = await foundReply.destroy();
    return deletedReply;
};

// Get and Update a single reply via Primary Key
const updateSingleReply = async (primaryKey, updatePayload) => {
    const updatedReply = await Reply.update(updatePayload, {
        where: {
            id: primaryKey
        }
    });
    if (updatedReply) {
        const foundUpdatedReply = await Reply.findByPk(primaryKey);
        return foundUpdatedReply;
    }
    return null;
};

module.exports = {
    getAllReplies,
    createReply,
    deleteSingleReply,
    updateSingleReply,
};