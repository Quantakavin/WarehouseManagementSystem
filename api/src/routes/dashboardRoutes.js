const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

// T-Loan Overview
router.get('/getcurentTloans', dashboardController.currentTLoans);
router.get('/getpendingTloans', dashboardController.PendingTLoans);
router.get('/getdraftTloans', dashboardController.DraftTLoans);
router.get('/getextendedTloan', dashboardController.ExtendedTLoans);

// RMA Overview
router.get();
router.get();
router.get();
router.get();

// Current T-Loan RMA Statistic

