const router = require('express').Router();

const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/tloan/newloan', TLoanController.newLoan);
router.post('/tloan/loanDrafting', TLoanController.SendDraft);
router.get('/tloans/:TLoanID', TLoanController.getLoanByNo);
router.get('/tloanitems/:TLoanID', TLoanController.getItemsByTloan);
router.post('/tloan/tloanextension', TLoanController.loanExtension);
router.get('/tloan/current/:UserID', TLoanController.currentLoan);
router.get('/tloan/drafts/:UserID', TLoanController.draftsLoan);
router.get('/tloan/history/:UserID', TLoanController.historyLoan);
router.get('/tloan/pending/:UserID', TLoanController.pendingLoan);
// router.put('/tloan/ready', TLoanController.readyLoan);
router.put('/tloan/approve/:TLoanID', TLoanController.approveLoan);
router.put('/tloan/reject/:TLoanID', TLoanController.rejectLoan);
// router.put('/tloan/due', TLoanController.dueLoan);
// router.put('/tloan/draft', TLoanController.draftLoan);
// router.put('/tloan/issued', TLoanController.issuedLoan);
// router.put('/tloan/picking', TLoanController.pickingLoan);
router.get('/tloan/ManagerLoan', TLoanController.ManagerLoan);
router.post('/tloan/extension', TLoanController.LoanExtend);
router.get('/tloanid/:TLoanID', TLoanController.getIDofLoan);

module.exports = router;
