const express = require('express');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const topicRoute = require('./topic.route');
const categoryRoute = require('./category.route');
const postRoute = require('./post.route');
const replyRoute = require('./reply.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/roles',
        route: roleRoute,
    },
    {
        path: '/topics',
        route: topicRoute,
    },
    {
        path: '/categories',
        route: categoryRoute,
    },
    {
        path: '/posts',
        route: postRoute,
    },
    {
        path: '/replies',
        route: replyRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;