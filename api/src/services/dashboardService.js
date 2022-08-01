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

// Processing RMAs
module.exports.getProcessingRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "3"`;
    return knex.raw(query);
};

// Rejected RMAs
module.exports.getRejectedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "4"`;
    return knex.raw(query);
};

// Received RMAs
module.exports.getReceivedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "5"`;
    return knex.raw(query);
};

// Verified RMAs
module.exports.getVerifiedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "6"`;
    return knex.raw(query);
};

// In Progress RMAs
module.exports.getIPRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "7"`;
    return knex.raw(query);
};

// Closed RMAs
module.exports.getClosedRMAs = async () => {
    const query = `SELECT * FROM Rma WHERE RMAStatusID = "8"`;
    return knex.raw(query);
};

// Recieved RMAs

// Verfied RMAs

// Current T-Loan and RMA Statistic

// Get Total TLoan Request, Month WHERE Status = 3
module.exports.getTLoanCurrentStats = async () => {
    const query = `SELECT COUNT(TLoanID) AS Requests,  MONTHNAME(ApplicationDate) as Month FROM TLoan WHERE TLoanStatusID = "3"  GROUP BY MONTHNAME(ApplicationDate)`;
    // const query = `select (select count(TLoanNumber) from TLoan) as TLoanRequests,
    // (select count(RmaID) from Rma) as RMARequest`;
    return knex.raw(query);
};

// Get Total RMA Request, Month WHERE Status = 2
module.exports.getRMACurrentStats = async () => {
    const query = `SELECT COUNT(RmaID) AS Requests,  MONTHNAME(DateTime) as Month FROM Rma WHERE RmaStatusID != "3" OR RmaStatusID != "7" GROUP BY MONTHNAME(DateTime)`;
    // const query = `select (select count(TLoanNumber) from TLoan) as TLoanRequests,
    // (select count(RmaID) from Rma) as RMARequest`;
    return knex.raw(query);
};

// Get TLoans Request Grouped By Type
module.exports.getTLoanCompanies = async () => {
    const query = `SELECT COUNT(T.TLoanID) AS Requests,  C.CompanyName as Company FROM TLoan T INNER JOIN Company C ON T.CompanyID=C.CompanyID GROUP BY Company`;
    return knex.raw(query);
};

// Get RMA Request
module.exports.getTLoanType = async () => {
    const query = `SELECT TT.TLoanType as Type, COUNT(T.TLoanID) AS Requests FROM TLoan T INNER JOIN  TLoanType TT ON TT.TLoanTypeID=T.TLoanTypeID GROUP BY Type`;
    return knex.raw(query);
};
