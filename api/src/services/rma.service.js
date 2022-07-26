const knex = require('../config/database');

module.exports.getByRmaID = async (RmaID) => {
    const query = ` SELECT
                    r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime',
                    r.ContactPerson,
                    r.CustomerEmail,
                    r.Company,
                    r.ContactNo,
                    r.RmaStatusID,
                    r.RejectReason
                    FROM Rma r, User u 
                    WHERE RmaID = ?
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [RmaID]);
};

module.exports.getRMAProducts = async (RmaID) => {
    const query = ` SELECT 
                    RmaProductPK as "id",
                    ItemCode,
                    InvoiceNo,      
                    DoNo,
                    DateOfPurchase,
                    RmaProductStatus,        
                    ReturnReason,
                    Instructions,       
                    CourseOfAction
                    FROM RmaProduct WHERE RmaID = ?`;
    return knex.raw(query, [RmaID]);
};

module.exports.getSalesmanRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID,
                    u.Username, 
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE SalesmanID = ? 
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanPendingRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 1
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanAcceptedRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 2
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanRejectedRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 4
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getSalesmanIPRMA = async (SalesmanID) => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE SalesmanID = ? 
                    AND RmaStatusID = 7
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query, [SalesmanID]);
};

module.exports.getAllRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u
                    WHERE r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getPendingRMA = async () => {
    const query = ` SELECT 
                    r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime', 
                    r.Company, 
                    r.CustomerEmail 
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 1
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getAcceptedRMA = async () => {
    const query = ` SELECT r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u
                    WHERE RmaStatusID = 2
                    AND r.SalesmanID = u.UserID
                    GROUP BY r.RmaID;`;
    return knex.raw(query);
};

module.exports.getInProgressChecklist = async () => {
    const query = ` SELECT r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u
                    WHERE RmaStatusID = 3
                    AND r.SalesmanID = u.UserID
                    GROUP BY r.RmaID;`;
    return knex.raw(query);
};

module.exports.getRejectedRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 4
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getReceivedRMA = async () => {
    const query = ` SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 5
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getVerifiedRMA = async () => {
    const query = `SELECT r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 6
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getIPRMA = async () => {
    const query = `SELECT r.RmaID, 
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 7
                    AND r.SalesmanID = u.UserID;`;
    return knex.raw(query);
};

module.exports.getClosedRMA = async () => {
    const query = `SELECT r.RmaID,
                    u.Username,
                    DATE_FORMAT(r.DateTime, "%d-%m-%Y") AS 'DateTime' ,
                    r.Company,
                    r.CustomerEmail
                    FROM Rma r, User u 
                    WHERE RmaStatusID = 8
                    AND r.SalesmanID = u.UserID;`;
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
                Company: company,
                ContactPerson: contactperson,
                CustomerEmail: contactemail,
                ContactNo: contactno,
                SalesmanID: salesmanid,
                RmaStatusID: 1
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

module.exports.updateRmaChecklist = async (RmaID, products) => {
    return await knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 3
            })
            .transacting(trx)
            .then(async () => {
                let rmaproducts = await products.map(async (product) => {
                    console.log(`${product.id} ${product.RmaProductStatus}`);
                    return await knex('RmaProduct')
                        .where('RmaProductPK', product.id)
                        .update({ RmaProductStatus: product.RmaProductStatus })
                        .transacting(trx);
                });
                return rmaproducts;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaRejected = async (RmaID, rejectreason) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 4,
                RejectReason: rejectreason
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
                RmaStatusID: 5
            })
            .transacting(trx)
            .then(async () => {
                return await knex('RmaProduct')
                .where('RmaID', RmaID)
                .update({RmaProductStatus: 1})
                .transacting(trx)
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaInstructions = async (RmaID, products) => {
    return await knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 6
            })
            .transacting(trx)
            .then(async () => {
                let rmaproducts = await products.map(async (product) => {
                    console.log(`${product.id} ${product.Instructions}`);
                    return await knex('RmaProduct')
                        .where('RmaProductPK', product.id)
                        .update({ Instructions: product.Instructions })
                        .transacting(trx);
                });
                return rmaproducts;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.updateRmaCOA = async (RmaID, products) => {
    return await knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 7
            })
            .transacting(trx)
            .then(async () => {
                let rmaproducts = await products.map(async (product) => {
                    console.log(`${product.id} ${product.CourseOfAction}`);
                    return await knex('RmaProduct')
                        .where('RmaProductPK', product.id)
                        .update({ CourseOfAction: product.CourseOfAction })
                        .transacting(trx);
                });
                return rmaproducts;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.closeRma = async (RmaID) => {
    return knex.transaction((trx) => {
        knex('Rma')
            .where('RmaID', RmaID)
            .update({
                RmaStatusID: 8
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};
