const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct`;
    return knex.raw(query);
};

module.exports.getByItemNo = async (itemNo) => {
    const query = `SELECT * FROM BinProduct WHERE ItemNo = ?`;
    return knex.raw(query, [itemNo]);
};