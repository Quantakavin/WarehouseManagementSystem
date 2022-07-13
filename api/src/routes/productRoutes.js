const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductByPrimaryKey);
router.post('/product/search', productController.searchFilterProducts);
router.get('/testproducts', productController.getAllProductsTest);

module.exports = router;
