const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/tloan/newloan', TLoanController.newLoan);
router.post('/tloan/loanDrafting', TLoanController.SendDraft);
router.get('/tloans/:TLoanNumber', TLoanController.getLoanByNo);
router.get('/tloanitems/:TLoanNumber', TLoanController.getItemsByTloan);
router.post('/tloan/tloanextension', TLoanController.loanExtension)
router.get('/tloan/current', TLoanController.currentLoan);
router.get('/tloan/drafts', TLoanController.draftsLoan);
router.get('/tloan/history', TLoanController.historyLoan);
router.get('/tloan/pending', TLoanController.pendingLoan);
router.put('/tloan/ready',TLoanController.readyLoan)
router.put('/tloan/approve',TLoanController.approveLoan)
router.put('/tloan/reject/:TLoanNumber',TLoanController.rejectLoan)
router.put('/tloan/due',TLoanController.dueLoan)
router.put('/tloan/draft',TLoanController.draftLoan)
router.put('/tloan/issued',TLoanController.issuedLoan)
router.put('/tloan/picking',TLoanController.pickingLoan)
router.get('/tloan/ManagerLoan', TLoanController.ManagerLoan);
router.post('/tloan/extension',TLoanController.LoanExtend)
router.get('/tloanid/:TLoanNumber', TLoanController.getIDofLoan)

module.exports = router;
