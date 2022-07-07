const productService = require('../services/productService');

// Get all products
module.exports.getAllProducts = async (req, res) => {
    const { offsetNo } = req.body;
    try {
        const result = await productService.getAll(offsetNo);
        return res.status(200).send(result[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};

// Get product by bin product primary key
module.exports.getProductByPrimaryKey = async (req, res) => {
    const binProductPK = req.params.binProductPK;
    try {
        const result = await productService.getByPrimaryKey(binProductPK);
        if (result.length > 0) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(404).send('Cannot retrieve product!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};

// Search and filter products
module.exports.searchFilterProducts = async (req, res) => {
    const { itemName, itemCode, binTag, batchNo, brand, warehouseCode } = req.body;
    try {
        const result = await productService.searchFilter(
            itemName,
            itemCode,
            binTag,
            batchNo,
            brand,
            warehouseCode
        );
        if (result.length > 0) {
            return res.status(200).send(result[0]);
        } else {
            return res.status(404).send('Cannot find product(s)!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error!'
        });
    }
};

// Get all Products with Pagination
module.exports.getAllProductsTest = async (req, res) => {
    try {
        const result = await productService.getAllTestr();
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};
