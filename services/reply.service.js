const { Reply, User } = require('../models');

// Get all replies
const getAllReplies = async () => {
    const replies = await Reply.findAll();
    return replies;
};

// Get a single reply via Primary Key
const getSingleReply = async (primaryKey) => {
    const reply = await Reply.findByPk(primaryKey, {
        include: [User]
    });
    return reply;
};

// Get specific replies related to certain PostId
const getRepliesByPostId = async (postId) => {
    console.log(postId);
    const replies = await Reply.findAll({
        where: {
            PostId: postId
        },
        include: [User]
    });
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
    getSingleReply,
    getRepliesByPostId,
    createReply,
    deleteSingleReply,
    updateSingleReply,
};