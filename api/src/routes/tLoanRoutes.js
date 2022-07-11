const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/tloan/newloan', TLoanController.newLoan);
router.get('/tloans/:number', TLoanController.searchLoan);
router.post('/tloan/tloanextension', TLoanController.loanExtension)
router.get('/tloan/current', TLoanController.currentLoan);
router.get('/tloan/draft', TLoanController.draftLoan);
router.get('/tloan/history', TLoanController.historyLoan);
router.get('/tloan/pending', TLoanController.pendingLoan);
router.put('/tloan/ready',TLoanController.readyLoan)
router.put('/tloan/approve',TLoanController.approveLoan)
router.put('/tloan/reject',TLoanController.rejectLoan)
router.put('/tloan/due',TLoanController.dueLoan)
router.put('/tloan/draft',TLoanController.draftLoan)
router.put('/tloan/issued',TLoanController.issuedLoan)
router.put('/tloan/picking',TLoanController.pickingLoan)


module.exports = router;
