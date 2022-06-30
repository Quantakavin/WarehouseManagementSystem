const knex = require('../config/database');

// T-Loan Overview

// Approved TLoans
module.exports.getCurrentTLoans = async () => {
    const query = `SELECT * FROM TLoan WHERE TLoanStatusID = "3"`;
    return knex.raw(query);
};

// Pending TLoans
module.exports.getPendingTLoans = async () => {
    const query = `SELECT * FROM TLoan WHERE TLoanStatusID = "4"`;
    return knex.raw(query);
};

// Draft TLoans
module.exports.getDraftTLoans = async () => {
    const query = `SELECT * FROM TLoan WHERE TLoanStatusID = "1"`;
    return knex.raw(query);
};

// Extended TLoans
module.exports.getExtendedTLoans = async () => {
    const query = `SELECT * FROM TLoanExtension`;
    return knex.raw(query);
};

// RMA Overview

// Approved RMAs
module.exports.getCurrentRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "2"`;
    return knex.raw(query);
};

// Pending RMAs
module.exports.getPendingRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "1" `;
    return knex.raw(query);
};

// Rejected RMAs
module.exports.getRejectedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "3"`;
    return knex.raw(query);
};

// Closed RMAs
module.exports.getClosedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "5"`;
    return knex.raw(query);
};

// Current T-Loan and RMA Statistic

// Get Total Request Made from TLoan and RMA
module.exports.getTLoanRMAStats = async () => {
    const query = `select (select count(TLoanNumber) from TLoan) as TLoanRequests,
    (select count(RmaNo) from Rma) as RMARequest`;
    return knex.raw(query);
};
