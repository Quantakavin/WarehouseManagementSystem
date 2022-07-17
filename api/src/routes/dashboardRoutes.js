const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

// T-Loan Overview
router.get('/getcurentTloans', dashboardController.currentTLoans);
router.get('/getpendingTloans', dashboardController.PendingTLoans);
router.get('/getdraftTloans', dashboardController.DraftTLoans);
router.get('/getextendedTloan', dashboardController.ExtendedTLoans);

// RMA Overview
router.get('/getpendingRMAs', dashboardController.pendingRMAs);
router.get('/getapprovedRMAs', dashboardController.approvedRMAs);
router.get('/getrejectedRMAs', dashboardController.rejectedRMAs);
router.get('/getreceivedRMAs', dashboardController.receivedRMAs);
router.get('/getverifiedRMAs', dashboardController.verifiedRMAs);
router.get('/getIPRMAs', dashboardController.IPRMAs);
router.get('/getclosedRMAs', dashboardController.closedRMAs);

// Current T-Loan and RMA Statistic
router.get('/getTloanStats', dashboardController.TLoanCurrentStats);
router.get('/getRMAStats', dashboardController.RMACurrentStats);

module.exports = router;
