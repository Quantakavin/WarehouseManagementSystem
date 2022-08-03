const knex = require('../config/database');

module.exports.expireOldTokens = async (email, used) => {
    const query = `UPDATE ResetPasswordToken SET Used = ? WHERE Email = ?`;
    return knex.raw(query, [used, email]);
};

module.exports.insertResetToken = async (email, tokenValue, createdAt, expiredAt, used) => {
    const query = `INSERT INTO ResetPasswordToken (Email, TokenValue, CreatedAt, ExpiredAt, Used) VALUES (?, ?, ?, ?, ?)`;
    return knex.raw(query, [email, tokenValue, createdAt, expiredAt, used]);
};

module.exports.findValidToken = async (token, email, currentTime) => {
    const query = `SELECT * FROM ResetPasswordToken WHERE (Email = ? AND TokenValue = ? AND ExpiredAt > ? AND Used = 0)`;
    return knex.raw(query, [email, token, currentTime]);
};
