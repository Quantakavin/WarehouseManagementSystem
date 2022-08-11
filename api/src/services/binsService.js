const knex = require('../config/database');

// Get Brand Names
module.exports.getBrandNames = async (Brand) => {
    const query = `SELECT DISTINCT Brand FROM BinProduct WHERE Brand LIKE ?`;
    return knex.raw(query, [`%${Brand}%`]);
};

// Get Bin By Bin Tag
module.exports.getBinByBinTag = async (BinTag) => {
    const query = `SELECT DISTINCT B.BinID, B.BinTag, B.HaiTag, B.Volume, B.Weight, B.BinType, count(BP.ItemNo) OVER() AS AmountOfItems FROM Bin B LEFT JOIN BinProduct BP ON B.BinID = BP.BinID WHERE B.BinTag = ?`;
    return knex.raw(query, [BinTag]);
};

module.exports.getEmptyBins = async() => {
    const query = `SELECT BinTag2, B.BinID FROM Bin B LEFT JOIN BinProduct BP ON B.BinID = BP.BinID WHERE BP.BinID IS NULL;`
    return knex.raw(query)
}

// Get Bin By Product Brand
// module.exports.getBinByProductBrand = async (Brand) => {
//     const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.Brand, COUNT(ItemName) as Items FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE Brand LIKE ?`;
//     return knex.raw(query, [Brand]);
// };

// Get Bin By Item Name
module.exports.getBinByProductName = async (ItemName) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.ItemName FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE ItemName LIKE ?`;
    return knex.raw(query, [ItemName]);
};

// Get Bin By Brand no COUNT
module.exports.getBinByProductBrand = async (ItemName) => {
    const query = `SELECT Bin.BinTag, Bin.BinID, BinProduct.ItemName, Brand FROM BinProduct LEFT JOIN Bin ON Bin.BinID = BinProduct.BinID WHERE Brand LIKE ?`;
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
