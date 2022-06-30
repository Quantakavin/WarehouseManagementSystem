const productService = require('../services/productService');

// Get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAll();
        return res.status(200).send(result[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    };
};

// Get product by item number
module.exports.getProductByItemNo = async (req, res) => {
    const itemNo = req.params.itemNo;
    try {
        const result = await productService.getByItemNo(itemNo);
        if (result.length > 0) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(404).send('Cannot retrieve product!');
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    };
};

// Search products by item name
// module.exports.searchProductsByItemName = async (req, res) => {
//     const itemName = req.body.itemName;
//     try {
//         const result = await productService.searchProductsByItemName(itemName);
//         if (result.length > 0) {
//             return res.status(200).send(result[0]);
//         } else {
//             return res.status(404).send('Cannot find product(s)!');
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Internal Server Error!'
//         });
//     };
// };

// Search and filter products
module.exports.searchFilterProducts = async (req, res) => {
    const itemName = req.body.itemName;
    const itemCode = req.body.itemCode;
    const binTag = req.body.binTag;
    const batchNo = req.body.batchNo;
    const brand = req.body.brand;
    const warehouseCode = req.body.warehouseCode;
    try {
        const result = await productService.searchFilter(itemName, itemCode, binTag, batchNo, brand, warehouseCode);
        if (result.length > 0) {
            return res.status(200).send("test");
        } else {
            return res.status(404).send('Cannot find product(s)!');
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    };
};