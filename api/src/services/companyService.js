const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT CompanyID, CompanyName FROM Company WHERE active = 'Y'`;
    return knex.raw(query);
};

module.exports.getAllForRMA = async () => {
    const query = `SELECT CompanyName as "label", CompanyID as "value" FROM Company WHERE active = 'Y'`;
    return knex.raw(query);
};