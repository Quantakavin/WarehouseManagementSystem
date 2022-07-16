const knex = require('../config/database');

module.exports.getByRmaID = async (RmaID) => {
    const query = ` SELECT
                    r.RmaID,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime',
                    r.ContactPerson,
                    r.CustomerEmail,
                    c.CompanyName,
                    r.ContactNo
                    FROM Rma r, Company c WHERE
                    RmaID = ? AND 
                    r.CompanyID = c.CompanyID;`;
    return knex.raw(query, [RmaID]);
};


module.exports.getRMAProducts = async (RmaID) => {
    const query = ` SELECT 
                    ItemCode,
                    InvoiceNo,      
                    DoNo,
                    DateOfPurchase,        
                    ReturnReason,
                    Instructions,       
                    CourseOfAction,
                    RmaProductPK
                    FROM RmaProduct WHERE RmaID = ?`;
    return knex.raw(query, [RmaID]);
};

module.exports.getSalesmanRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c
                    WHERE SalesmanID = ? 
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanAcceptedRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 2
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanRejectedRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 3
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query, [SalesmanID]);
};


module.exports.getAllRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getPendingRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime', 
                    c.CompanyName, 
                    r.CustomerEmail 
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 1 
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getAcceptedRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 2
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getReceivedRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 4
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getVerifiedRMA = async () => {
    const query = `SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 5
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getIPRMA = async () => {
    const query = `SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 6
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.getClosedRMA = async () => {
    const query = `SELECT r.RmaID, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    c.CompanyName,
                    r.CustomerEmail
                    FROM Rma r, Company c 
                    WHERE RmaStatusID = 7
                    AND r.CompanyID = c.CompanyID;`;
    return knex.raw(query);
};

module.exports.insertRMA = async (contactperson, contactemail, company, contactno, salesmanid) => {
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

module.exports.insertRMAData = async (
    contactperson,
    contactno,
    salesmanid,
    contactemail,
    company,
    rmaProducts
) => {
    return knex.transaction((trx) => {
        knex.insert(
            {
                CompanyID: company,
                ContactPerson: contactperson,
                CustomerEmail: contactemail,
                ContactNo: contactno,
                SalesmanID: salesmanid,
                RmaStatusID: 1,
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

module.exports.updateRmaAccepted = async (RmaID) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 2
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaRejected = async (RmaID) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 3
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRMAReceived = async (RmaID) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 4
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

// module.exports.updateRmaInstructions = async (RmaID, products) => {
//     return knex.transaction((trx) => {
//         knex('Rma')
//             .where('RmaID', RmaID)
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

module.exports.updateRmaInstructions = async (RmaID, products) => {
    return await knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 5
            })
            .transacting(trx)
            .then(async () => {
                let rmaproducts = await products.map(async (product) => {
                    console.log(`${product.RmaProductPK} ${product.instructions}`);
                        return await knex('RmaProduct')
                        .where('RmaProductPK', product.RmaProductPK)
                        .update({Instructions: product.instructions})
                        .transacting(trx)
                })
                return rmaproducts;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaCOA = async (RmaID, products) => {
    return await knex.transaction((trx) => {
        knex('Rmaproduct')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 6
            })
            .transacting(trx)
            .then(async () => {
                let rmaproducts = await products.map(async (product) => {
                    console.log(`${product.RmaProductPK} ${product.courseofaction}`);
                        return await knex('RmaProduct')
                        .where('RmaProductPK', product.RmaProductPK)
                        .update({CourseOfAction: product.courseofaction})
                        .transacting(trx)
                })
                return rmaproducts;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.closeRMA = async (RmaID) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 7
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};
