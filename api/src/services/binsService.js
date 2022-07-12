const knex = require('../config/database');

// Get Bin By Bin Tag
module.exports.getBinByBinTag = async (BinTag) => {
    const query = `SELECT BinID, BinTag, HaiTag, Volume, Weight, BinType FROM Bin WHERE BinTag = ?`;
    return knex.raw(query, [BinTag]);
};

// Get Bin By Product Brand
module.exports.getBinByProductBrand = async (Brand) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.Brand FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE Brand LIKE ?`;
    return knex.raw(query, [Brand]);
};

// Get Bin By Item Name
module.exports.getBinByProductName = async (ItemName) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.ItemName FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE ItemName LIKE ?`;
    return knex.raw(query, [ItemName]);
};
