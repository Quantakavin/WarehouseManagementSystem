const router = require('express').Router();
const binsController = require('../controllers/binsController');

router.get('/getbinInformmation', binsController.binInfo);
router.get('/bintag/:BinTag', binsController.binTag);
router.get('/brand/:Brand', binsController.brand);
router.get('/itemname/:ItemName', binsController.ItemName);
router.get('/binproducts/:BinTag', binsController.BinProducts);

module.exports = router;
