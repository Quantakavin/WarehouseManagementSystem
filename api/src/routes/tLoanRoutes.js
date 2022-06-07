const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/newloan', TLoanController.newLoan)

module.exports = router;