const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/newloan', TLoanController.newLoan);
router.get('/tloans/:number', TLoanController.searchLoan);

module.exports = router;
