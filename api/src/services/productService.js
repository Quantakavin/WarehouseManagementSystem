const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct`;
    return knex.raw(query);
};

module.exports.getByItemName = async (itemName) => {
    const query = `SELECT * FROM BinProduct WHERE ItemName = ?`;
    return knex.raw(query, [itemName]);
};

// module.exports.searchByItemName = async (itemName) => {
//     var itemName = '%' + itemName + '%';
//     const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct WHERE ItemName LIKE ?`;
//     return knex.raw(query, [itemName]);
// };

module.exports.searchProducts = async (itemName, itemCode, binTag, batchNo, brand, warehouseCode) => {
    var string = ``;
    var counter = 0;
    if (itemName) {
        string += `ItemName LIKE ?`
        counter++;
    }
    if (itemCode) {
        if (counter > 0) {
            string += ` ItemNo = ?`;
        } else {
            string += ` AND ItemNo = ?`;
        }
        counter++;
    }
    if (binTag) {
        if (counter > 0) {
            string += ` BinID = ?`;
        } else {
            string += ` AND BinID = ?`;
        }
        counter++;
    }
    if (batchNo) {
        if (counter > 0) {
            string += ` BatchNo = ?`;
        } else {
            string += ` AND BatchNo = ?`;
        }
        counter++;
    }
    if (brand) {
        if (counter > 0) {
            string += ` Brand = ?`;
        } else {
            string += ` AND Brand = ?`;
        }
        counter++;
    }
    if (warehouseCode) {
        if (counter > 0) {
            string += ` WarehouseCode = ?`;
        } else {
            string += ` AND WarehouseCode = ?`;
        }
        counter++;
    }
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct WHERE ` + string;
    return knex.raw(query, [itemName, itemCode, binTag, batchNo, brand, warehouseCode]);
};