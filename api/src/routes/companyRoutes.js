const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const companyController = require('../controllers/companyController');

router.get('/companies', authorization.verifyAdmin, companyController.getAllCompanies);
router.get('/rmacompanies', companyController.getAllCompaniesForRMA);

module.exports = router;
