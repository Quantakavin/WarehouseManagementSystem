const knex = require('../config/database');

// T-Loan Overview 
module.exports.getCurrentTLoans = async () => {
    const query = `SELECT * FROM TLoan`;
    return knex.raw(query);
};

module.exports.getPendingTLoans = async () => {
    const query = ``;
    return knex.raw(query);
};

module.exports.getDraftTLoans = async () => {
    const query = ``;
    return knex.raw(query);
};

module.exports.getExtendedTLoans = async () => {
    const query = ``;
    return knex.raw(query);
};

// RMA Overview  
module.exports.getCurrentRMAs = async () => {
    const query = `SELECT * FROM Rma`;
    return knex.raw(query);
};

module.exports.getPendingRMAs = async () => {
    const query = ``;
    return knex.raw(query);
};

module.exports.getRejectedRMAs = async () => {
    const query = ``;
    return knex.raw(query);
};

// Current T-Loan and RMA Statistic
module.exports.getTLoanRMAStats = async () => {
    const query = ``;
    return knex.raw(query);
};




