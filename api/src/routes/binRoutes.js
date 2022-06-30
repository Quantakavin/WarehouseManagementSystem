const router = require('express').Router();
const binsController = require('../controllers/binsController');

// Bin Informmation Test
router.get('/getbinInformmation', binsController.binInfo);

module.exports = router;
