const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductByPrimaryKey);
router.post('/product/search', productController.searchFilterProducts);

module.exports = router;
