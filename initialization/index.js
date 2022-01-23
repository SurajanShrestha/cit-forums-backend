const { User, Role, Category, Topic, Post, Reply } = require('../models');
const { sequelize } = require('../database');

// Check database connection
async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has established successfully');
    } catch (err) {
        console.error('Unable to connect to database: ' + err);
    }
}

// Sync all models
async function syncAllModels(force = false) {
    // Relation between User and Role
    Role.hasMany(User, {
        foreignKey: {
            allowNull: false
        }
    });
    User.belongsTo(Role);

    // Relation between Topic and User
    User.hasMany(Topic, {
        foreignKey: {
            allowNull: false
        }
    });
    Topic.belongsTo(User);

    // Relation between Topic and Category
    Category.hasMany(Topic, {
        foreignKey: {
            allowNull: false
        }
    });
    Topic.belongsTo(Category);

    // Relation between Post and User
    User.hasMany(Post, {
        foreignKey: {
            allowNull: false
        }
    });
    Post.belongsTo(User);

    // Relation between Post and Topic
    Topic.hasMany(Post, {
        foreignKey: {
            allowNull: false
        }
    });
    Post.belongsTo(Topic);

    // Relation between Reply and Post
    Post.hasMany(Reply, {
        foreignKey: {
            allowNull: false
        }
    });
    Reply.belongsTo(Post);

    // Relation between Reply and User
    User.hasMany(Reply, {
        foreignKey: {
            allowNull: false
        }
    });
    Reply.belongsTo(User);

    try {
        await sequelize.sync({ force });
        console.log('||*****All Models were synchronized successfully*****||');
    } catch (err) {
        console.log('Unable to synchronize All Models in the database: ' + err);
    }
}

//
// Create a table
//
// Sync Users
async function syncUsersToDb(userDataArray, userData, force = false) {
    // Associations must always be called before sync
    // Role.hasOne(User,{
    //     foreignKey: {
    //         allowNull: false
    //     }
    // });
    // User.belongsTo(Role);
    try {
        // Sync all defined models. The { force: true } means that if a table already exists, it will drop it and create a new one.
        await User.sync({ force });
        console.log('||*****User Models were synchronized successfully*****||');
        if (userDataArray) {
            // Create and save more than one row/record in the database
            User.bulkCreate(
                userDataArray,
                {
                    validate: true
                }
            ).then(notes => {
                console.log(notes);
            }).catch(err => {
                console.log('Error occured: ' + err);
            });
        }

        if (userData) {
            const john = await User.create(userData);
            const johnRole = await john.getRole();
            console.log(johnRole);
            console.log(johnRole.type);
        }
    } catch (err) {
        console.log('Unable to synchronize User models in the database: ' + err);
    }
}

// Sync Roles
async function syncRolesToDb(roleDataArray, force = false) {
    try {
        await Role.sync({ force });
        console.log('||*****Role Models were synchronized successfully*****||');

        if (roleDataArray) {
            Role.bulkCreate(roleDataArray,
                {
                    validate: true
                }
            ).then(roles => {
                console.log(roles);
            }).catch(err => {
                console.log('Error occured: ' + err);
            });
        }
    } catch (err) {
        console.log('Unable to synchronize Role models in the database: ' + err);
    }
}

// Sync Categories
async function syncCategoriesToDb(categoryDataArray, force = false) {
    try {
        await Category.sync({ force });
        console.log('||*****Category Models were synchronized successfully*****||');

        if (categoryDataArray) {
            Category.bulkCreate(categoryDataArray,
                {
                    validate: true
                }
            ).then(categories => {
                console.log(categories);
            }).catch(err => {
                console.log('Error occured: ' + err);
            });
        }
    } catch (err) {
        console.log('Unable to synchronize Category models in the database: ' + err);
    }
}

// Sync Topics
async function syncTopicsToDb(topicsDataArray, force = false) {
    try {
        await Topic.sync({ force });
        console.log('||*****Topic Models were synchronized successfully*****||');

        if (topicsDataArray) {
            Topic.bulkCreate(topicsDataArray,
                {
                    validate: true
                }
            ).then(topics => {
                console.log(topics);
            }).catch(err => {
                console.log('Error occured: ' + err);
            });
        }
    } catch (err) {
        console.log('Unable to synchronize Topic models in the database: ' + err);
    }
}

// Sync Posts
async function syncPostsToDb(postsDataArray, force = false) {
    try {
        await Post.sync({ force });
        console.log('||*****Post Models were synchronized successfully*****||');

        if (postsDataArray) {
            Post.bulkCreate(postsDataArray,
                {
                    validate: true
                }
            ).then(posts => {
                console.log(posts);
            }).catch(err => {
                console.log('Error occured: ' + err);
            });
        }
    } catch (err) {
        console.log('Unable to synchronize Post models in the database: ' + err);
    }
}

// Sync Replies
async function syncRepliesToDb(repliesDataArray, force = false) {
    try {
        await Reply.sync({ force });
        console.log('||*****Reply Models were synchronized successfully*****||');

        if (repliesDataArray) {
            Reply.bulkCreate(repliesDataArray,
                {
                    validate: true
                }
            ).then((replies) => {
                console.log(replies);
            }).catch((err) => {
                console.log('Error occured: ' + err);
            });
        }
    } catch (err) {
        console.log('Unable to synchronize Reply models in the database: ' + err);
    }
}

module.exports = {
    testDbConnection,
    syncAllModels,
    syncUsersToDb,
    syncRolesToDb,
    syncCategoriesToDb,
    syncTopicsToDb,
    syncPostsToDb,
    syncRepliesToDb,
};