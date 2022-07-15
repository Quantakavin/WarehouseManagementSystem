/* eslint-disable prettier/prettier */
const knex = require('../config/database');

// T-Loan Overview

// Submitted TLoans
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

// Approved TLoans

// Rejected TLoans

// Due TLoans

// Ready TLoans

// Picking TLoans

// Issued TLoans

// RMA Overview

// Incoming RMAs
module.exports.getPendingRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "1" `;
    return knex.raw(query);
};

//  Accepted RMAs
module.exports.getApprovedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "2" `;
    return knex.raw(query);
};

// Rejected RMAs
module.exports.getReceivedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "4"`;
    return knex.raw(query);
};

// Closed RMAs
module.exports.getClosedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "6"`;
    return knex.raw(query);
};

// Recieved RMAs

// Verfied RMAs

// Current T-Loan and RMA Statistic

// Get Total TLoan Request, Month WHERE Status = 3
module.exports.getTLoanCurrentStats = async () => {
    const query = `SELECT COUNT(TLoanNumber) AS Requests,  MONTHNAME(ApplicationDate) as Month FROM TLoan WHERE TLoanStatusID = "3"  GROUP BY ApplicationDate`;
    // const query = `select (select count(TLoanNumber) from TLoan) as TLoanRequests,
    // (select count(RmaNo) from Rma) as RMARequest`;
    return knex.raw(query);
};

// Get Total RMA Request, Month WHERE Status = 2
module.exports.getRMACurrentStats = async () => {
    const query = `SELECT COUNT(RmaNo) AS Requests,  MONTHNAME(DateTime) as Month FROM Rma WHERE RmaStatusID != "3" OR RmaStatusID != "6" GROUP BY DateTime`;
    // const query = `select (select count(TLoanNumber) from TLoan) as TLoanRequests,
    // (select count(RmaNo) from Rma) as RMARequest`;
    return knex.raw(query);
};
