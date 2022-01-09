const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// const cors = require('cors');
// const path = require('path');
const { PORT } = require('./config');

// Declarations
const app = express();

app.get('/', (req, res) => {
    res.send('Server Started');
});

//Listen to the server
app.listen(PORT, () => {
    console.log('Listening to Port: ' + PORT);
});
