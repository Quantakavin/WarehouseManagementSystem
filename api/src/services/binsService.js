const knex = require('../config/database');

// Bin Informmation
module.exports.getBinInformmation = async () => {
    const query = `SELECT * FROM Bin `;
    return knex.raw(query);
};
