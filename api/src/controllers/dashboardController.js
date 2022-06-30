const dashboard = require('../services/dashboardService');

const redisClient = require('../config/caching');

// T-Loan Overview
module.exports.currentTLoans = async (req, res) => {
    try {
        const CurrentTLoans = await redisClient.get('CurretTLoans');
        if (CurrentTLoans !== null) {
            const redisresults = JSON.parse(CurrentTLoans);
            return res.status(200).json(redisresults);
        }
        const results = await dashboard.getCurrentTLoans();
        if (results.length > 0) {
            console.log('endpoint working');
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
        const results = await dashboard.getPendingTLoans();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no pending TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.DraftTLoans = async (req, res) => {
    try {
        const results = await dashboard.getDraftTLoans();
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
        const results = await dashboard.getExtendedTLoans();
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
        const results = await dashboard.getCurrentRMAs();
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
        const results = await dashboard.getPendingRMAs();
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
        const results = await dashboard.getRejectedRMAs();
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
        const results = await dashboard.getClosedRMAs();

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
        const results = await dashboard.getTLoanRMAStats();
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
