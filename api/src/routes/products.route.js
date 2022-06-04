const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/test', productsController.Test());
router.get('/', productsController.getAllProducts());
router.get('/:ItemNo', productsController.getByItemNo());

module.exports = router;
