const dashboard = require('../services/dashboardService');

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
            return res.status(404).send('There is no incoming TLoans');
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
            return res.status(404).send('There is no incoming TLoans');
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
            return res.status(404).send('There is no incoming TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// RMA Overview
// Current T-Loan RMA Statistic
