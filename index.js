const express = require('express');
const cors = require('cors');
// const path = require('path');
const bodyParser = require('body-parser');
const { PORT } = require('./config');
const {
    testDbConnection,
    syncAllModels,
    /*
    syncUsersToDb,
    syncRolesToDb,
    syncCategoriesToDb,
    syncTopicsToDb,
    syncPostsToDb,
    syncRepliesToDb
    */
} = require('./initialization');
const routes = require('./routes');

// Declarations
const app = express();

// Server Setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server Started');
});

// Listen to the server
app.listen(PORT, () => {
    console.log('Listening to Port: ' + PORT);
});

// Test Connection to our Database running in XAMPP
testDbConnection();

syncAllModels();

// syncUsersToDb([
//     { email: 'adminx@surajan.com', password: 'Password@1234', name: 'Surajan Shrestha', age: 16, contact: 1234567890, RoleId: 1 },
// ], null, true);

// syncUsersToDb(null, true, { email: 'john@surajan.com', password: 'Password@123', name: 'John Doe', age: 16, contact: 1234567890, RoleId: 1 });

// syncRolesToDb([{ type: 'admin' }, { type: 'user' }]);

// syncCategoriesToDb([{ name: 'Science' }, { name: 'Maths' }]);

// syncTopicsToDb([{ title: 'College Canteen is full of rats', UserId: 1, CategoryId: 2 },
// { title: "It's lockdown. No one's even discussing about Discount.", UserId: 1, CategoryId: 2 }], true);

// syncPostsToDb([{ content: "Your inability to understand a kitchen baffles me.", UserId: 1, TopicId: 2 },
// { content: "No one will do a single thing about it.", UserId: 3, TopicId: 1 }], true);

// syncRepliesToDb([{ content: "Your inability to understand hygiene baffles me.", UserId: 1, PostId: 3 },
// { content: "Let's fight for it.", likes: 10, UserId: 3, PostId: 2 }], true);

// Get Requests
// app.get("/users", async (req, res) => {
//     try {
//         console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
//         const users = await User.findAll();
//         res.json(users);
//     } catch (err) {
//         console.log('Users not found. Error: ' + err);
//     }
// });

// v1 api routes
app.use('/api/v1', routes);
// app.use('/api/v1', userRoute);

// Post Requests
// app.post("/users", async (req, res) => {
//     try {
//         console.log(`${req.method}: ${req.path} ${new Date().toString()}`);
//         const user = await User.create({
//             email: req.body.email,
//             password: req.body.password,
//             name: req.body.name,
//             age: req.body.age,
//             contact: req.body.contact,
//             RoleId: req.body.RoleId,
//         });
//         console.log('**User successfully created with email: ' + req.body.email);
//         res.json(user);
//     } catch (err) {
//         res.send('Error creating user');
//         console.log('**User could not be created. Error: ' + err);
//     }
// })