const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT * FROM TLoan`;
    return knex.raw(query);
};

module.exports.tloanOutItem = async (itemno, itemname, quantity, batchno, warehousecode) => {
    return knex('TLoanOutItem').insert({
        itemno,
        itemname,
        quantity,
        batchno,
        warehousecode
    });
};

module.exports.createTLoan = async (
    type,
    company,
    name,
    purpose,
    applicationdate,
    duration,
    requireddate,
    user,
    email,
    collection,
    tloanItems
) => {
    knex.transaction(function (trx) {
        knex.insert(
            {
                TLoanTypeID: type,
                CompanyID: company,
                Requestor: name,
                Purpose: purpose,
                ApplicationDate: applicationdate,
                Duration: duration,
                RequiredDate: requireddate,
                TLoanStatusID: 4,
                PickStatusID: 1,
                Remarks: null,
                UserID: user,
                CustomerEmail: email,
                Collection: collection
            },
            'TLoanID'
        )
            .into('TLoan')
            .transacting(trx)
            .then(function (ids) {
                tloanItems.forEach((item) => (item.TLoanID = ids[0]));
                return knex('TLoanOutItem').insert(tloanItems).transacting(trx);
            })

            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.SendTLoanToDraft = async (
    type,
    company,
    name,
    purpose,
    applicationdate,
    duration,
    requireddate,
    user,
    email,
    collection,
    tloanItems
) => {
    knex.transaction(function (trx) {
        knex.insert(
            {
                TLoanTypeID: type,
                CompanyID: company,
                Requestor: name,
                Purpose: purpose,
                ApplicationDate: applicationdate,
                Duration: duration,
                RequiredDate: requireddate,
                TLoanStatusID: 1,
                PickStatusID: 1,
                Remarks: null,
                UserID: user,
                CustomerEmail: email,
                Collection: collection
            },
            'TLoanID'
        )
            .into('TLoan')
            .transacting(trx)
            .then(function (ids) {
                tloanItems.forEach((item) => (item.TLoanID = ids[0]));
                return knex('TLoanOutItem').insert(tloanItems).transacting(trx);
            })

            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.getLoanByNumber = async (TLoanID) => {
    // const query = `SELECT t.TLoanNumber,DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
    // DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
    // c.CompanyName,
    // t.Requestor, FROM TLoan t JOIN Company C WHERE t.TLoanNumber = ?, t.CompanyID = c.CompanyID`
    const query = `   SELECT 
	t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS 'EndDate',
  c.CompanyName,
  t.CustomerEmail,
  ts.TLoanStatus,
  tt.TLoanType,
  t.Collection,
  t.Purpose,
  te.Reason,
  nullif(max(tes.TLoanExtensionStatus), min(tes.TLoanExtensionStatus)),
  IFNULL(tes.TLoanExtensionStatus,'NIL') AS 'TLoanExtensionStatus'
  FROM TLoan t 
  LEFT JOIN Company c ON t.CompanyID = c.CompanyID
  JOIN TLoanStatus ts ON ts.TLoanStatusID = t.TLoanStatusID
  JOIN TLoanType tt on tt.TLoanTypeID = t.TLoanTypeID
  JOIN TLoanExtension te on te.TLoanID = t.TLoanID 
  LEFT JOIN TLoanExtensionStatus tes ON tes.TLoanExtensionStatusID = te.TLoanExtensionStatusID
  WHERE t.TLoanID = ?
 `;
    return knex.raw(query, [TLoanID]);
};

module.exports.getTLoanOutItem = async (TLoanID) => {
    const query = `SELECT 
  tl.TLoanID,
  tl.ItemNo,
  tl.ItemName,
  tl.BatchNo,
  tl.Quantity,
  tl.WarehouseCode
  FROM TLoanOutItem tl 
  WHERE tl.TLoanID = ?
  `;

    return knex.raw(query, [TLoanID]);
};

module.exports.extension = async (id, duration, reason) => {
    return knex('TLoanExtension').insert({
        TLoanID: id,
        TLoanExtensionStatusID: '1',
        Duration: duration,
        Reason: reason
    });
};

module.exports.getCurrent = async (UserID) => {
    const query = `
  SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t JOIN Company c
  ON t.CompanyID = c.CompanyID 
  JOIN User u ON  t.UserID= u.UserID 
  WHERE t.UserID=? AND t.TLoanStatusID IN (3,5,6,7);`;
    return knex.raw(query, [UserID]);
};

module.exports.getPending = async (UserID) => {
    const query = `
  SELECT
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t JOIN Company c
  ON t.CompanyID = c.CompanyID 
  JOIN User u ON  t.UserID= u.UserID 
  WHERE t.UserID=? AND t.TLoanStatusID = "4";`;
    return knex.raw(query, [UserID]);
};

module.exports.getDraft = async (UserID) => {
    const query = `
  SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t JOIN Company c
  ON t.CompanyID = c.CompanyID 
  JOIN User u ON  t.UserID= u.UserID 
  WHERE t.UserID=? AND t.TLoanStatusID = "1";`;
    return knex.raw(query, [UserID]);
};

module.exports.getHistory = async (UserID) => {
    const query = `
  SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t JOIN Company c
  ON t.CompanyID = c.CompanyID 
  JOIN User u ON  t.UserID= u.UserID 
  WHERE t.UserID=? AND t.TLoanStatusID = "8";`;
    return knex.raw(query, [UserID]);
};

module.exports.getManagerLoan = async () => {
    const query = `
  SELECT
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  t.Requestor,
  tt.TLoanType
  FROM TLoan t, TLoanType tt where t.TLoanStatusID = "4" AND 
  t.TLoanTypeID = tt.TLoanTypeID;`;
    return knex.raw(query);
};

module.exports.getManagerExtension = async () => {
    const query = `
    SELECT
    t.TLoanID,
     DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
     t.Requestor,
     tt.TLoanType,
     te.TLoanExtensionStatusID,
     te.Reason
     FROM TLoan t
     JOIN TLoanType tt ON t.TLoanTypeID = tt.TLoanTypeID
     JOIN TLoanExtension te ON te.TLoanID = t.TLoanID
      JOIN TLoanExtensionStatus tes ON tes.TLoanExtensionStatusID = te.TLoanExtensionStatusID
      where te.TLoanExtensionStatusID = "1"
  `;
    return knex.raw(query);
};

module.exports.approveLoan = async (TLoanID) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanID', TLoanID)
            .update({
                TLoanStatusID: 3
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

//Add status to db
module.exports.rejectLoan = async (TLoanID, remarks) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanID', TLoanID)
            .update({
                TLoanStatusID: 9,
                Remarks: remarks
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

// module.exports.pickLoan = async (number) => {
//     return knex.transaction((trx) => {
//         knex('TLoan')
//             .where('TLoanNumber', number)
//             .update({
//                 TLoanStatusID: 5
//             })
//             .transacting(trx)
//             .then(trx.commit)
//             .catch(trx.rollback);
//     });
// };

// module.exports.issuedLoan = async (number) => {
//     return knex.transaction((trx) => {
//         knex('TLoan')
//             .where('TLoanNumber', number)
//             .update({
//                 TLoanStatusID: 7
//             })
//             .transacting(trx)
//             .then(trx.commit)
//             .catch(trx.rollback);
//     });
// };

module.exports.dueLoan = async (number) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanNumber', number)
            .update({
                TLoanStatusID: 8
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

// module.exports.readyLoan = async (number) => {
//     return knex.transaction((trx) => {
//         knex('TLoan')
//             .where('TLoanID', number)
//             .update({
//                 TLoanStatusID: 6
//             })
//             .transacting(trx)
//             .then(trx.commit)
//             .catch(trx.rollback);
//     });
// };

// module.exports.draftLoan = async (number) => {
//     return knex.transaction((trx) => {
//         knex('TLoan')
//             .where('TLoanNumber', number)
//             .update({
//                 TLoanStatusID: 1
//             })
//             .transacting(trx)
//             .then(trx.commit)
//             .catch(trx.rollback);
//     });
// };

module.exports.loanExtension = async (tloanid, duration, reason) => {
    return knex('TLoanExtension').insert({
        TLoanID: tloanid,
        TLoanExtensionStatusID: 1,
        Duration: duration,
        Reason: reason
    });
};

module.exports.getID = async (TLoanID) => {
    const query = `   SELECT 
	TLoanID
  FROM TLoan
  WHERE TLoanID = ?
 `;
    return knex.raw(query, [TLoanID]);
};

module.exports.approveExtension = async (TLoanID) => {
    return knex.transaction((trx) => {
        knex('TLoanExtension')
            .where('TLoanID', TLoanID)
            .update({
                TLoanExtensionStatusID: 2
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

//Add status to db
module.exports.rejectExtension = async (TLoanID, remarks) => {
    return knex.transaction((trx) => {
        knex('TLoanExtension')
            .where('TLoanID', TLoanID)
            .update({
                TLoanExtensionStatusID: 3,
                Remarks: remarks
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.getExtensionStatus = async (TLoanID) => {
    const query = `  SELECT 
	t.TLoanID,
    nullif(max(tes.TLoanExtensionStatus), min(tes.TLoanExtensionStatus)),
    IFNULL(tes.TLoanExtensionStatus, 'NIL') As 'ExtensionStatus'
  FROM TLoan t 
  JOIN TLoanExtension te ON t.TLoanID = te.TLoanID
  LEFT JOIN TLoanExtensionStatus tes ON te.TLoanExtensionStatusID = tes.TLoanExtensionStatusID
  WHERE t.TLoanID = ?
 `;
    return knex.raw(query, [TLoanID]);
};

module.exports.getApproved = async () => {
    const query = `   SELECT
    t.TLoanID,
    DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
    DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
    c.CompanyName,
    t.CustomerEmail,
    count(t.TLoanID) OVER() AS full_count
    FROM TLoan t JOIN Company c
    ON t.CompanyID = c.CompanyID 
    WHERE t.TLoanStatusID = 3
 `;
    return knex.raw(query);
};
