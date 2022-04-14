module.exports = {
    PORT: process.env.PORT || 8080,
    // Generally a jwt secret is stored in a .env file and is not shared with anyone except the team members.
    JWT: {
        secret: process.env.jwtSecret || 'mysecret',
    }
};