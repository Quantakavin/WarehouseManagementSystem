const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:itemName', productController.getProductByItemName);
// router.get('/products/search', productController.searchProductsByItemName);
router.get('/products/search', productController.searchProducts);

module.exports = router;