const productService = require('../services/productService');

// Get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAll();
        return res.status(200).send(result[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    };
};

// Get product by ItemNo
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