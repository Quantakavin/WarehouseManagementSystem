const knex = require('../config/database');


// Get Brand Names
module.exports.getBrandNames = async (Brand) => {
    const query = `SELECT DISTINCT Brand FROM BinProduct WHERE Brand LIKE ?`;
    return knex.raw(query, [`%${Brand}%`]);
};

// Get Bin By Bin Tag
module.exports.getBinByBinTag = async (BinTag) => {
    const query = `SELECT BinID, BinTag, HaiTag, Volume, Weight, BinType FROM Bin WHERE BinTag = ?`;
    return knex.raw(query, [BinTag]);
};

// Get Bin By Product Brand
module.exports.getBinByProductBrand = async (Brand) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.Brand, COUNT(ItemName) as Items FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE Brand LIKE ?`;
    return knex.raw(query, [Brand]);
};

// Get Bin By Item Name
module.exports.getBinByProductName = async (ItemName) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.ItemName FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE ItemName LIKE ?`;
    return knex.raw(query, [ItemName]);
};

// Get Bin Location, Items, Item Compmany, Capacity by Bin Tag
module.exports.getBinByProductName = async (BinTag) => {
    const query = `SELECT
    BinProduct.BinID,
    BinProduct.ItemName,
    BinProduct.ItemNo,
    BinProduct.Brand,
    BinProduct.WarehouseCode,
    Bin.BinTag AS Location ,
    Bin.Volume,
    Bin.Weight
  FROM BinProduct
    INNER JOIN Bin
      ON BinProduct.BinID = Bin.BinID WHERE BinTag LIKE ?`;
    return knex.raw(query, [BinTag]);
};

// Get Amount of Items in Bin

module.exports.getBinItemsByBrand = async (Brand) => {
    const query = `SELECT COUNT(ItemName) as Items FROM isdnwarehouse2.BinProduct WHERE Brand LIKE ?`;
    return knex.raw(query, [Brand]);
};

module.exports.getgetBinItemsByBinID = async (BinID) => {
    const query = `SELECT COUNT(ItemName) as Items FROM isdnwarehouse2.BinProduct WHERE BinID LIKE ?`;
    return knex.raw(query, [BinID]);
};
