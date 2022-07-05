const router = require('express').Router();

const productController = require('../controllers/productController');

router.post('/products', productController.getAllProducts);
router.get('/products/:binProductPK', productController.getProductByPrimaryKey);
router.post('/products/search', productController.searchFilterProducts);

module.exports = router;