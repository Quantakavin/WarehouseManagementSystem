const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT * FROM TLoan`;
    return knex.raw(query);
};

module.exports.tloanOutItem = async (
    itemno,
    itemname,
    quantity,
    batchno,
    warehousecode,
    basketitemid
) => {
    return knex('TLoanOutItem').insert({
        itemno,
        itemname,
        quantity,
        batchno,
        warehousecode,
        basketitemid
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
                CompanyName: company,
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
                CompanyName: company,
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

module.exports.DeleteProductsByID = async (TLoanID) => {
    return knex.transaction((trx) => {
        knex('TLoanOutItem')
            .where('TLoanID', TLoanID)
            .del()
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.TLoanOutByID = async (
    TLoanID,
    itemno,
    itemname,
    quantity,
    batchno,
    warehousecode,
    basketitemid
) => {
    return knex('TLoanOutItem').insert({
        TLoanID,
        itemno,
        itemname,
        quantity,
        batchno,
        warehousecode,
        basketitemid
    });
};
module.exports.SubmitAfterEdit = async (
    TLoanID,
    type,
    company,
    purpose,
    applicationdate,
    duration,
    requireddate,
    email,
    collection,
    tloanItems
) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanID', TLoanID)
            .update(
                {
                    TLoanTypeID: type,
                    CompanyName: company,
                    Purpose: purpose,
                    ApplicationDate: applicationdate,
                    Duration: duration,
                    RequiredDate: requireddate,
                    TLoanStatusID: 4,
                    CustomerEmail: email,
                    Collection: collection
                },
                'TLoanID'
            )
            .transacting(trx)
            .then(function () {
                // tloanItems.forEach((item) => (item.TLoanID = TLoanID));
                return knex('TLoanOutItem').insert(tloanItems).transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.DraftAfterEdit = async (
    TLoanID,
    type,
    company,
    purpose,
    applicationdate,
    duration,
    requireddate,
    email,
    collection,
    tloanItems
) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanID', TLoanID)
            .update(
                {
                    TLoanTypeID: type,
                    CompanyName: company,
                    Purpose: purpose,
                    ApplicationDate: applicationdate,
                    Duration: duration,
                    RequiredDate: requireddate,
                    CustomerEmail: email,
                    Collection: collection
                },
                'TLoanID'
            )
            .transacting(trx)
            .then(function () {
                // tloanItems.forEach((item) => (item.TLoanID = TLoanID));
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
    // t.Requestor, FROM TLoan t JOIN Company C WHERE t.TLoanNumber = ?, t.CompanyName = c.CompanyName`
    const query = `   SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(t.RequiredDate, "%Y-%m-%d") AS 'RequiredDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS 'EndDate1',
  DATE_FORMAT(DATE_ADD(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), INTERVAL IFNULL(tesel.duration,0)  DAY), "%d-%m-%Y") AS 'EndDate',
  coalesce(c.CompanyName, t.CompanyName) AS "CompanyName",
  t.CustomerEmail,
  c.CompanyID,
  ts.TLoanStatus,
  tt.TLoanType,
  t.Collection,
  t.Purpose,
  t.TLoanStatusID,
  t.TLoanTypeID,
  t.CompanyName AS 'CompanyID', 
  t.Duration,
  te.Reason,
  te.Duration AS "ExtensionDuration",
  nullif(max(te.TLoanExtensionStatusID), min(te.TLoanExtensionStatusID)),
  IFNULL(te.TLoanExtensionStatusID,'NIL') AS TLoanExtensionStatusID,
  nullif(max(tes.TLoanExtensionStatus), min(tes.TLoanExtensionStatus)),
  IFNULL(tes.TLoanExtensionStatus,'NIL') AS 'TLoanExtensionStatus'
  FROM TLoan t 
  LEFT JOIN Company c ON t.CompanyName = c.CompanyID
  JOIN TLoanStatus ts ON ts.TLoanStatusID = t.TLoanStatusID
  JOIN TLoanType tt on tt.TLoanTypeID = t.TLoanTypeID 
  LEFT JOIN (SELECT duration, TLoanID from TLoanExtension where TLoanExtensionStatusID = 2) tesel ON tesel.TLoanID = t.TLoanID
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
  tl.WarehouseCode,
  tl.BasketItemID
  FROM TLoanOutItem tl 
  WHERE tl.TLoanID = ?
  `;

    return knex.raw(query, [TLoanID]);
};

module.exports.getCurrent = async (UserID) => {
    const query = `
  SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t 
  LEFT JOIN Company c
  ON t.CompanyName = c.CompanyID 
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
  COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t LEFT JOIN Company c
  ON t.CompanyName = c.CompanyID 
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
  COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t 
  LEFT JOIN Company c
  ON t.CompanyName = c.CompanyID 
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
  COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t 
  LEFT JOIN Company c
  ON t.CompanyName = c.CompanyID 
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

module.exports.loanExtension = async (TLoanID, duration, reason) => {
    return knex('TLoanExtension').insert({
        TLoanID: TLoanID,
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
    COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
    t.CustomerEmail,
    count(t.TLoanID) OVER() AS full_count
    FROM TLoan t LEFT JOIN Company c
    ON t.CompanyName = c.CompanyID 
    WHERE t.TLoanStatusID IN (3,5,6)
 `;
    return knex.raw(query);
};

module.exports.getStatusID = async (TLoanID) => {
    const query = ` SELECT
    TLoanStatusID 
    FROM TLoan 
    WHERE TLoanID = ?
 `;
    return knex.raw(query, [TLoanID]);
};

module.exports.allCurrent = async () => {
    const query = `
    SELECT 
    t.TLoanID,
    DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
    DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
    COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
    t.CustomerEmail,
    u.UserID,
    count(t.TLoanID) OVER() AS full_count
    FROM TLoan t LEFT JOIN Company c
    ON t.CompanyName = c.CompanyID 
    JOIN User u ON  t.UserID= u.UserID 
  WHERE t.TLoanStatusID IN (3,5,6,7)`;
    return knex.raw(query);
};
module.exports.allHistory = async () => {
    const query = `
    SELECT 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  COALESCE (c.CompanyName, t.CompanyName) AS 'CompanyName',
  t.CustomerEmail,
  u.UserID,
  count(t.TLoanID) OVER() AS full_count
  FROM TLoan t LEFT JOIN Company c
  ON t.CompanyName = c.CompanyID 
  JOIN User u ON  t.UserID= u.UserID 
  WHERE t.TLoanStatusID = "8"`;
    return knex.raw(query);
};

module.exports.updateStatus = async (TLoanID, statusChange) => {
    return knex.transaction((trx) => {
        knex('TLoan')
            .where('TLoanID', TLoanID)
            .update({
                TLoanStatusID: statusChange
            })
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.getEmployeeInfo = async (TLoanID) => {
    const query = `
    SELECT u.Email,
    u.Username,
    u.UserID,
    u.TelegramID
    FROM User u 
    JOIN TLoan t ON t.UserID = u.UserID 
    WHERE t.TLoanID = ?
    `;
    return knex.raw(query, [TLoanID]);
};
