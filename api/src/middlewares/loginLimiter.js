const rate_limiter = require('express-rate-limit');
const loginLimiter = rate_limiter({
    windows: 1 * 20 * 1000,
    max: 3,
    statusCode: 200,
    message: {
        status: 429,
        error: 'Attemp to login to accout limit reachedm, please wait and try again in 10 minutes.'
    }
});

module.exports = loginLimiter;
