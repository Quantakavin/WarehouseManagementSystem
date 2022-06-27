const dashboard = require('../services/dashboardService');
const redisClient = require('../config/caching');

// T-Loan Overview
module.exports.currentTLoans = async (req, res) => {
    try {
        const results = await TLoan.getCurrentTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no incoming TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.PendingTLoans = async (req, res) => {
    try {
        const results = await TLoan.getPendingTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no pendding TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.DraftTLoans = async (req, res) => {
    try {
        const results = await TLoan.getDraftTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no draft TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.ExtendedTLoans = async (req, res) => {
    try {
        const results = await TLoan.getExtendedTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no extended TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// RMA Overview

module.exports.currentRMAs = async (req, res) => {
    try {
        const results = await TLoan.getCurrentRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no Approved RMAs');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.pendingRMAs = async (req, res) => {
    try {
        const results = await TLoan.getPendingRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no pendding RMAs');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.rejectedRMAs = async (req, res) => {
    try {
        const results = await TLoan.getRejectedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no rejected RMAs');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.closedRMAs = async (req, res) => {
    try {
        const results = await TLoan.getClosedRMAs();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no closed RMAs');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Current T-Loan RMA Statistic

module.exports.TLoanRMAStats = async (req, res) => {
    try {
        const results = await TLoan.getTLoanRMAStats();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('Error retriving T-Loan RMA Statistic');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};
