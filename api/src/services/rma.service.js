const knex = require('../config/database');

module.exports.getByRMANo = async (RMANo) => {
    // return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT * FROM Rma WHERE RMANo = ?`;
    return knex.raw(query, [RMANo]);
};

module.exports.getSalesmanRMA = async (SalesmanID) => {
    // return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT * FROM Rma WHERE r.SalesmanID = ?`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getAllRMA = async () => {
    const query = `SELECT * FROM Rma`;
    return knex.raw(query);
};

module.exports.getPendingRMA = async () => {
    const query = `SELECT * FROM Rma WHERE RmaStatusID = 1`;
    return knex.raw(query);
};

module.exports.getAcceptedRMA = async () => {
    const query = `SELECT * FROM Rma WHERE RmaStatusID = 2`;
    return knex.raw(query);
};

module.exports.getReceivedRMA = async () => {
    const query = `SELECT * FROM Rma WHERE RmaStatusID = 4`;
    return knex.raw(query);
};

module.exports.getVerifiedRMA = async () => {
    const query = `SELECT * FROM Rma WHERE RmaStatusID = 5`;
    return knex.raw(query);
};

module.exports.insertRMA = async (
    company,
    contactperson,
    contactno,
    rmano,
    invoice,
    salesmanid,
    instruction
) => {
    return knex('Rma').insert({
        CompanyID: company,
        ContactPerson: contactperson,
        ContactNo: contactno,
        RMANo: rmano,
        SupplierRMA: invoice,
        SalesmanID: salesmanid,
        RmaStatusID: 1,
        Instruction: instruction
    });
};

module.exports.updateRmaAccepted = async (rmaNo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', rmaNo)
            .update({
                RmaStatusID: 2
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaRejected = async (rmaNo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', rmaNo)
            .update({
                RmaStatusID: 3
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateProductReceived = async (rmaNo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', rmaNo)
            .update({
                RmaStatusID: 4
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaInstructions = async (rmaNo, instruction) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', rmaNo)
            .update({
                Instruction: instruction,
                RmaStatusID: 5
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaCOA = async (rmaNo, COA) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', rmaNo)
            .update({
                CourseOfAction: COA
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};
