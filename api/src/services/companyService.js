const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT CompanyID, CompanyName FROM Company WHERE active = 'Y'`;
    return knex.raw(query);
};

module.exports.getAll2 = async () => {
    const query = `SELECT CompanyID as "value", CompanyName as "label" FROM Company WHERE active = 'Y'`;
    return knex.raw(query);
};
