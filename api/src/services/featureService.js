const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT FeatureID, FeatureName FROM Feature`;
    return knex.raw(query);
};

module.exports.getAllRights = async () => {
    const query = `SELECT FeatureRightID, FeatureRight FROM FeatureRight`;
    return knex.raw(query);
};
