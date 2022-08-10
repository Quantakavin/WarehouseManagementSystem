const rateLimiter = require('express-rate-limit');

const loginLimiter = rateLimiter({
    windows: 1 * 20 * 1000,
    max: 3,
    statusCode: 200,
    message: {
        status: 429,
        error: 'Attempt to login to account limit reached, please wait and try again in 10 minutes.'
    }
});

module.exports = loginLimiter;
