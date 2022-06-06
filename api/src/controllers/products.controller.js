/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { productsService } = require('../services');

// Test
exports.Test = async (req, res) => {
    try {
        const result = await productsService.Test();

        if (!result)
            return res.status(404).json({
                error: 'Error!'
            });
        return res.status(200).json({
            result
        });
    } catch (e) {
        console.log({ e });
    }
};

// Get all products
// eslint-disable-next-line consistent-return
exports.getAllProducts = async (req, res) => {
    try {
        const result = await productsService.getAllProducts();

        if (!result)
            return res.status(404).json({
                error: 'Product(s) not found!'
            });
        return res.status(200).json({
            result
        });
    } catch (e) {
        console.log({ e });
    }
};

// Get product by ItemNo
exports.getByItemNo = async (req, res) => {
    const { ItemNo } = req.params;
    const rma = await productsService.getByItemNo(ItemNo);

    if (!post)
        return res.status(404).json({
            error: 'Product not found!'
        });
    return res.status(200).json({
        result
    });
};
