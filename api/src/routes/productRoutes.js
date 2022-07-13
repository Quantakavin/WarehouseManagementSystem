const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:binProductPK', productController.getProductByPrimaryKey);
router.post('/products/search', productController.searchFilterProducts);
router.get('/testproducts', productController.getAllProductsTest);

module.exports = router;
