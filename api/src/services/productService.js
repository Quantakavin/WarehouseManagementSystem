const knex = require('../config/database');

module.exports.getAll = async (limit, page) => {
    const query = ` SELECT
                    bp.BinProductPK, 
                    b.BinTag2,
                    bp.Brand,
                    bp.ItemNo, 
                    bp.ItemName,
                    bp.BatchNo, 
                    bp.BatchInDate, 
                    bp.WarehouseCode, 
                    bp.Quantity,
                    count(BinProductPK) OVER() AS full_count
                    FROM BinProduct bp, Bin b 
                    WHERE bp.BinID = b.BinID
                    LIMIT ? OFFSET ?`;
    return knex.raw(query, [Number(limit), Number(page)]);
};

module.exports.getByPrimaryKey = async (binProductPK) => {
    const query = `SELECT p.*, b.BinTag2 FROM BinProduct p LEFT JOIN Bin b ON p.BinID = b.BinID WHERE p.BinProductPK = ?`;
    return knex.raw(query, [binProductPK]);
};

module.exports.searchFilter = async (itemName, itemCode, binTag, batchNo, brand, warehouseCode) => {
    let string = ``;
    const list = [];
    let counter = 0;
    if (itemName) {
        string += `ItemName LIKE ?`;
        list.push(`%${itemName}%`);
        counter += 1;
    }
    if (itemCode) {
        if (counter > 0) {
            string += ` AND ItemNo = ?`;
        } else {
            string += ` ItemNo = ?`;
        }
        list.push(itemCode);
        counter += 1;
    }
    if (binTag) {
        if (counter > 0) {
            string += ` AND BinID = ?`;
        } else {
            string += ` BinID = ?`;
        }
        list.push(binTag);
        counter += 1;
    }
    if (batchNo) {
        if (counter > 0) {
            string += ` AND BatchNo = ?`;
        } else {
            string += ` BatchNo = ?`;
        }
        list.push(batchNo);
        counter += 1;
    }
    if (brand) {
        if (counter > 0) {
            string += ` AND Brand = ?`;
        } else {
            string += ` Brand = ?`;
        }
        list.push(brand);
        counter += 1;
    }
    if (warehouseCode) {
        if (counter > 0) {
            string += ` AND WarehouseCode = ?`;
        } else {
            string += ` WarehouseCode = ?`;
        }
        list.push(warehouseCode);
        counter += 1;
    }
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct WHERE ${string}`;
    return knex.raw(query, list);
};

module.exports.getAllpag = async () => {
    const query = `SELECT ItemNo, ItemName, BatchNo, Brand, Quantity FROM BinProduct LIMIT 100`;
    return knex.raw(query);
};
