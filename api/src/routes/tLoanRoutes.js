const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/newloan', TLoanController.newLoan);
router.get('/tloans/:number', TLoanController.searchLoan);
router.post('/tloanextension', TLoanController.loanExtension)
router.get('/current', TLoanController.currentLoan);
router.get('/draft', TLoanController.draftLoan);
router.get('/history', TLoanController.historyLoan);
router.get('/pending', TLoanController.pendingLoan);

module.exports = router;
