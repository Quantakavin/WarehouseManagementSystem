const knex = require('../config/database');

// Get Bin By Bin Tag
module.exports.getBinInformmation = async () => {
    const query = `SELECT * FROM Bin WHERE BinTag =?`;
    return knex.raw(query, [BinTag]);
};

// Get Bin By Product Brand
module.exports.getBinByProductBrand = async () => {
    const query = `SELECT * FROM BinProduct WHERE Brand =?`;
    return knex.raw(query, [Brand]);
};

// Get Bin By Item Name
module.exports.getBinByProductName = async () => {
    const query = `SELECT * FROM BinProduct WHERE ItemName =?`;
    return knex.raw(query), [ItemName];
};

// Get List of Empty Bins
module.exports.getEmptyBins = async () => {
    const query = `SELECT * FROM isdnwarehouse2.Bin WHERE Volume = "0"`;
    return knex.raw(query);
};

// Test
module.exports.getBinByBinTag = async () => {
    const query = ``;
    return knex.raw(query);
};
