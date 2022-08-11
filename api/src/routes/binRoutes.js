const router = require('express').Router();
const binsController = require('../controllers/binsController');

router.get('/getbinInformmation', binsController.binInfo);
router.get('/bintag/:BinTag', binsController.binTag);
router.get('/brand/:Brand', binsController.brand);
router.get('/brandnames', binsController.getAllBrandNames);
router.get('/itemname/:ItemName', binsController.ItemName);
router.get('/binproducts/:BinTag', binsController.BinProducts);
router.get('/binqtybrand/:Brand', binsController.BinQtyBrand);
router.get('/binqtybinid/:BinID', binsController.BinQtyBinID);
router.get('/emptybins', binsController.emptyBins);

module.exports = router;
