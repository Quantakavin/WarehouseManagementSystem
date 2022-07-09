const knex = require('../config/database');

// module.exports.getByRMANo = async (RMANo) => {
//     const query = `SELECT RmaID, 
//                    DateTime, 
//                    CompanyID, 
//                    ContactPerson, 
//                    RMANo, 
//                    Supplier, 
//                    SupplierRma, 
//                    SalesmanID, 
//                    RmaStatusID, 
//                    Instruction, 
//                    CourseOfAction 
//                    FROM Rma WHERE RMANo = ?`;
//     return knex.raw(query, [RMANo]);
// };

module.exports.getByRMANo = async (RMANo) => {
    const query = `SELECT * FROM Rma WHERE RMANo = ?`;
    return knex.raw(query, [RMANo]);
};

module.exports.getSalesmanRMA = async (SalesmanID) => {
    const query = `SELECT * FROM Rma WHERE SalesmanID = ?`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getRMAProducts = async (RmaID) => {
    const query = `SELECT * FROM RmaProduct WHERE RmaID = ?`;
    return knex.raw(query, [RmaID])
}

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
    contactperson,
    contactemail,
    company,
    contactno,
    salesmanid
) => {
    return knex('Rma').insert({
        CompanyID: company,
        ContactPerson: contactperson,
        CustomerEmail: contactemail,
        ContactNo: contactno,
        SalesmanID: salesmanid,
        RmaStatusID: 1
    });
};

module.exports.insertRMAProducts = async (
    itemcode,
    invoiceno,
    dono,
    dateofpurchase,
    reasonforreturn
) => {
    return knex('RmaProduct').insert({
        itemcode,
        invoiceno,
        dono,
        dateofpurchase,
        reasonforreturn
    });
};

module.exports.updateRmaAccepted = async (RMANo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                RmaStatusID: 2
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaRejected = async (RMANo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                RmaStatusID: 3
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRMAReceived = async (RMANo) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                RmaStatusID: 4
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaInstructions = async (RMANo, instructions) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                Instruction: instructions,
                RmaStatusID: 5
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaCOA = async (RMANo, COA) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                CourseOfAction: COA
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};
