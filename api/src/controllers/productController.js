const productService = require('../services/productService');
const redisClient = require('../config/caching');

// Get all products
// module.exports.getAllProducts = async (req, res) => {
//     const { limit, offset } = req.query;
//     try {
//         const result = await productService.getAll(limit, offset);
//         return res.status(200).send(result[0]);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Internal Server Error!'
//         });
//     }
// };
module.exports.getAllProducts = async (req, res) => {
    const { limit, page } = req.query;
    try {
        const products = await redisClient.get(`products?limit=${limit}&page=${page}`);
        if (products !== null) {
            console.log("Products have been found in redis")
            const redisresults = JSON.parse(products);
            return res.status(200).json(redisresults);
        }
        const results = await productService.getAll(limit, page);
        redisClient.set(`products?limit=${limit}&page=${page}`, JSON.stringify(results[0]));
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// Get product by bin product primary key
// module.exports.getProductByPrimaryKey = async (req, res) => {
//     const binProductPK = req.params.binProductPK;
//     try {
//         const result = await productService.getByPrimaryKey(binProductPK);
//         if (result.length > 0) {
//             return res.status(200).send(result[0]);
//         } else {
//             return res.status(404).send('Cannot retrieve product!');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Internal Server Error!'
//         });
//     }
// };
module.exports.getProductByPrimaryKey = async (req, res) => {
    const binProductPK = req.params.id;
    try {
        const products = await redisClient.get(`product#${binProductPK}`);
        if (products !== null) {
            const redisresults = JSON.parse(products);
            return res.status(200).json(redisresults);
        }
        const results = await productService.getByPrimaryKey(binProductPK);
        if (results[0].length > 0) {
            redisClient.set(`product#${binProductPK}`, JSON.stringify(results[0]));
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find product with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
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

// Get all products pagination
module.exports.getAllProductsPag = async (req, res) => {
    const { offsetNo } = req.body;
    try {
        const result = await productService.getAllpag(offsetNo);
        return res.status(200).send(result[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    }
};
