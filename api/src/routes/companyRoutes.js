const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const companyController = require('../controllers/companyController');

router.get('/companies', authorization.verifyAdmin, companyController.getAllCompanies);
router.get('/companies2', authorization.verifyAdmin, companyController.getAllCompanies2);

module.exports = router;
