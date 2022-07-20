const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT NotiFeatureID, NotiFeature FROM NotiFeature`;
    return knex.raw(query);
};

module.exports.getAllTypes = async () => {
    const query = `SELECT NotiTypeID, NotiType FROM NotiType`;
    return knex.raw(query);
};
