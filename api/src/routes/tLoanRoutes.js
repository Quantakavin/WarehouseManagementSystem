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
router.put('/ready',TLoanController.readyLoan)
router.put('/approve',TLoanController.approveLoan)
router.put('/reject',TLoanController.rejectLoan)
router.put('/due',TLoanController.dueLoan)
router.put('/draft',TLoanController.draftLoan)
router.put('/issued',TLoanController.issuedLoan)
router.put('/picking',TLoanController.pickingLoan)

module.exports = router;
