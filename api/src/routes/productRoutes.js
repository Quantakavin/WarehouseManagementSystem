const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:itemNo', productController.getProductByItemNo);
// router.get('/products/search', productController.searchProductsByItemName);
router.get('/products/search', productController.searchFilterProducts);

module.exports = router;