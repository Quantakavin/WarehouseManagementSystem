const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/product/:itemNo', productController.getProductByItemNo);

module.exports = router;
