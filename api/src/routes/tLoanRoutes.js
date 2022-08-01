const router = require('express').Router();
const validation = require('../middlewares/validation');
const TLoanController = require('../controllers/tloanController');

router.get('/tloan', TLoanController.allLoan);
router.post('/tloan/newloan', validation.validateLoan, TLoanController.newLoan);
router.post('/tloan/loanDrafting', TLoanController.SendDraft);
router.get('/tloans/:TLoanID', TLoanController.getLoanByNo);
router.get('/tloanitems/:TLoanID', TLoanController.getItemsByTloan);
router.get('/tloanExtensionStatus/:TLoanID', TLoanController.extensionStatus);
router.post('/tloan/tloanextension', TLoanController.loanExtension);
router.get('/tloan/current/:UserID', TLoanController.currentLoan);
router.get('/tloan/drafts/:UserID', TLoanController.draftsLoan);
router.get('/tloan/history/:UserID', TLoanController.historyLoan);
router.get('/tloan/pending/:UserID', TLoanController.pendingLoan);
// router.put('/tloan/ready', TLoanController.readyLoan);
router.put('/tloan/approve/:TLoanID', TLoanController.approveLoan);
router.put('/tloan/reject/:TLoanID', validation.validateRejectRemark,TLoanController.rejectLoan);
router.put('/tloan/approveExtension/:TLoanID', TLoanController.approveExtension);
router.put('/tloan/rejectExtension/:TLoanID', validation.validateRejectRemark,TLoanController.rejectExtension);
// router.put('/tloan/due', TLoanController.dueLoan);
// router.put('/tloan/draft', TLoanController.draftLoan);
// router.put('/tloan/issued', TLoanController.issuedLoan);
// router.put('/tloan/picking', TLoanController.pickingLoan);
router.get('/tloan/ManagerLoan', TLoanController.ManagerLoan);
router.get('/tloan/ManagerExtension', TLoanController.ManagerExtension);
router.post('/tloan/extension',validation.validateExtensionRequest, TLoanController.LoanExtend);
router.get('/tloanid/:TLoanID', TLoanController.getIDofLoan);
router.get('/tloanstatusid/:TLoanID', TLoanController.tloanStatusID);
router.get('/tloan/approvedloans', TLoanController.getApprovedLoan);
router.put('/tloan/submitEditedDraft/:TLoanID', TLoanController.SubmitAfterEdit)
router.put('/tloan/draftEditedDraft/:TLoanID', TLoanController.DraftAfterEdit)
module.exports = router;
