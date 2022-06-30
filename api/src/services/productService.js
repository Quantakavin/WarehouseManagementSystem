const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct`;
    return knex.raw(query);
};

module.exports.getByItemNo = async (itemNo) => {
    const query = `SELECT * FROM BinProduct WHERE ItemNo = ?`;
    return knex.raw(query, [itemNo]);
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
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct WHERE ` + string;
    return knex.raw(query, list);
};