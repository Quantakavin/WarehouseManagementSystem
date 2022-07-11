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
    return knex.raw(query, [RmaID]);
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

module.exports.insertRMA = async (contactperson, contactemail, company, contactno, salesmanid) => {
    return knex('Rma').insert({
        Company: company,
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

module.exports.insertRMAData = async (
    contactperson,
    contactno,
    rmano,
    salesmanid,
    contactemail,
    company,
    rmaProducts
) => {
    return knex.transaction((trx) => {
        knex.insert(
            {
                Company: company,
                ContactPerson: contactperson,
                CustomerEmail: contactemail,
                ContactNo: contactno,
                SalesmanID: salesmanid,
                RmaStatusID: 1,
                RMANo: rmano
            },
            'RmaID'
        )
            .into('Rma')
            .transacting(trx)
            .then((RmaID) => {
                if (rmaProducts.length > 0) {
                    rmaProducts.forEach((product) => {
                        [product.RmaID] = RmaID; // eslint-disable-line no-param-reassign
                    });
                    return knex('RmaProduct').insert(rmaProducts).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
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

// module.exports.updateRmaInstructions = async (RMANo, products) => {
//     return knex.transaction((trx) => {
//         knex('Rma')
//             .where('RMANo', RMANo)
//             .update({
//                 RmaStatusID: 5
//             })
//             .transacting(trx)
//             .then(() => {
//                 products.map(product => {
//                     console.log(product.RmaProductPK + " " + product.instructions)
//                     return knex('RmaProduct')
//                     .where('RmaProductPK', product.RmaProductPK)
//                     .update({Instructions: product.instructions}).transacting(trx)
//                 })
//                 // for (let i = 0; i < products.length; i++) {
//                 //     console.log(products[i].RmaProductPK + " " + products[i].instructions)
//                 //         return knex('RmaProduct')
//                 //         .where('RmaProductPK', products[i].RmaProductPK)
//                 //         .update({
//                 //             Instructions: products[i].instructions
//                 //         })
//                 //         .transacting(trx)
//                 //         console.log("called")
//                 // }

//             })
//             .then(trx.commit)
//             .catch(trx.rollback);
//     });
// };

module.exports.updateRmaInstructions = async (RMANo, products) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RMANo', RMANo)
            .update({
                RmaStatusID: 5
            })
            .transacting(trx)
            .then(() => {
                products.forEach((product) => {
                    console.log(`${product.RmaProductPK} ${product.instructions}`);
                    return knex('RmaProduct')
                        .where('RmaProductPK', product.RmaProductPK)
                        .update({ Instructions: product.instructions })
                        .transacting(trx);
                });
                // for (let i = 0; i < products.length; i++) {
                //     console.log(products[i].RmaProductPK + " " + products[i].instructions)
                //         return knex('RmaProduct')
                //         .where('RmaProductPK', products[i].RmaProductPK)
                //         .insert(
                //             {
                //             Instructions: products[i].instructions
                //             }
                //         )
                //         .transacting(trx)
                // }
            })
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
