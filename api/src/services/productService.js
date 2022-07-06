const knex = require('../config/database');

module.exports.getAll = async (offsetNo) => {
    const query = `SELECT BinProductPK, ItemName, BatchNo, Brand, Quantity FROM BinProduct LIMIT 100 OFFSET ?`;
    return knex.raw(query, [parseInt(offsetNo)]);
};

module.exports.getByPrimaryKey = async (binProductPK) => {
    const query = `SELECT * FROM BinProduct WHERE BinProductPK = ?`;
    return knex.raw(query, [binProductPK]);
};

module.exports.searchFilter = async (itemName, itemCode, binTag, batchNo, brand, warehouseCode) => {
    var string = ``;
    var list = [];
    var counter = 0;
    if (itemName) {
        string += `ItemName LIKE ?`;
        list.push('%' + itemName + '%');
        counter++;
    }
    if (itemCode) {
        if (counter > 0) {
            string += ` AND ItemNo = ?`;
        } else {
            string += ` ItemNo = ?`;
        }
        list.push(itemCode);
        counter++;
    }
    if (binTag) {
        if (counter > 0) {
            string += ` AND BinID = ?`;
        } else {
            string += ` BinID = ?`;
        }
        list.push(binTag);
        counter++;
    }
    if (batchNo) {
        if (counter > 0) {
            string += ` AND BatchNo = ?`;
        } else {
            string += ` BatchNo = ?`;
        }
        list.push(batchNo);
        counter++;
    }
    if (brand) {
        if (counter > 0) {
            string += ` AND Brand = ?`;
        } else {
            string += ` Brand = ?`;
        }
        list.push(brand);
        counter++;
    }
    if (warehouseCode) {
        if (counter > 0) {
            string += ` AND WarehouseCode = ?`;
        } else {
            string += ` WarehouseCode = ?`;
        }
        list.push(warehouseCode);
        counter++;
    }
    const query =
        `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct WHERE ` + string;
    return knex.raw(query, list);
};

module.exports.getAllTest = async (offsetNo) => {
    const query = `SELECT BinProductPK, ItemName, BatchNo, Brand, Quantity FROM BinProduct`;
    return knex.raw(query);
};
