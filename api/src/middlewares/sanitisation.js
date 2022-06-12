const validator = require('validator');

const sanitization = {
    sanitizeResult(req, res, next) {
        for (let i = 0; i < res.length; i += 1) {
            const row = res[i];
            for (const key in row) {
                const val = row[key];
                if (typeof val === 'string') {
                    row[key] = validator.blacklist(val, '<|>|\'|"|&');
                    res.status(400).json({
                        message: 'Malicious Data Detected'
                    });
                }
            }
        }
        next();
    }
};

module.exports = sanitization;
