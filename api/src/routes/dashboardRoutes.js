const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

// T-Loan Overview
router.get('/getcurentTloans', dashboardController.currentTLoans);
router.get('/getpendingTloans', dashboardController.PendingTLoans);
router.get('/getdraftTloans', dashboardController.DraftTLoans);
router.get('/getextendedTloan', dashboardController.ExtendedTLoans);

// RMA Overview
router.get('/getcurrentRMAs', dashboardController.currentRMAs);
router.get('/getpendingRMAs', dashboardController.pendingRMAs);
router.get('/getrejectedRMAs', dashboardController.rejectedRMAs);
router.get('/getclosedRMAs', dashboardController.closedRMAs);

// Current T-Loan RMA Statistic
router.get('/getTloanRMMAStats', dashboardController.TLoanRMAStats);

module.exports = router;
