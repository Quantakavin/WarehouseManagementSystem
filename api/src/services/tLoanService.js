const knex = require('../config/database')



module.exports.getAll = async () => {
  const query = `SELECT * FROM TLoan`;
  return knex.raw(query);
}



module.exports.tloanOutItem = async (
  itemno,
  itemname,
  quantity,
  batchno
) => {
  return knex('TLoanOutItem').insert({
    itemno,
    itemname,
    quantity,
    batchno
  });
};




module.exports.createTLoan = async (type, company, number, name, purpose, applicationdate, duration, requireddate, user,email,collection, tloanItems) => {
  knex.transaction(function(trx) {
   
    knex.insert({
      TLoanTypeID: type,
      CompanyID: company,
      TLoanNumber: number,
      Requestor: name,
      Purpose: purpose,
      ApplicationDate: applicationdate,
      Duration: duration,
      RequiredDate: requireddate,
      TLoanStatusID: 4,
      PickStatusID: 1,
      Remarks: null,
      UserID: user,
      CustomerEmail:email,
      Collection: collection,
    }, 'TLoanID')
    .into('TLoan')
    .transacting(trx)
    .then(function(ids) {
      tloanItems.forEach((item) =>  item.TLoanID = ids[0] ) 
      return knex('TLoanOutItem').insert(tloanItems).transacting(trx);
      })
      
      .then(trx.commit)
      .catch(trx.rollback)
  })
}

module.exports.getLoanByNumber = async(TLoanNumber) => {
  // const query = `SELECT t.TLoanNumber,DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  // DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  // c.CompanyName,
  // t.Requestor, FROM TLoan t JOIN Company C WHERE t.TLoanNumber = ?, t.CompanyID = c.CompanyID`
  const query = `   SELECT 
	t.TLoanID,
  t.TLoanNumber,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS 'EndDate',
  c.CompanyName,
  t.CustomerEmail
  FROM TLoan t 
  LEFT JOIN Company c ON t.CompanyID = c.CompanyID
  WHERE t.TLoanNumber = ?
 `
  return knex.raw(query, [TLoanNumber])
}

module.exports.getTLoanOutItem = async(TLoanID) =>{

  const query = 
  `SELECT 
  tl.TLoanID,
  tl.ItemNo,
  tl.BatchNo,
  tl.Quantity
  FROM TLoanOutItem tl 
  WHERE tl.TLoanID = ?
  `

  return knex.raw(query, [TLoanID])
}

module.exports.extension = async(id,duration,reason) => {
  return knex('TLoanExtension').insert({
    TLoanID : id,
    TLoanExtensionStatusID: '1',
    Duration: duration,
    Reason : reason
  })
}


module.exports.getCurrent = async () => {
  const query = `
  SELECT t.TLoanNumber,
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, Company c where TLoanStatusID IN (3,5,6,7) AND 
  t.CompanyID = c.CompanyID;`;
  return knex.raw(query);
}

module.exports.getPending = async () => {
  const query = `
  SELECT t.TLoanNumber, 
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, Company c where TLoanStatusID = "4" AND 
  t.CompanyID = c.CompanyID;`;
  return knex.raw(query);
}

module.exports.getDraft = async () => {
  
  const query = `
  SELECT t.TLoanNumber,
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, Company c where TLoanStatusID = "1" AND 
  t.CompanyID = c.CompanyID;`;
  return knex.raw(query)
  
}

module.exports.getHistory = async () => {
  const query = `
  SELECT t.TLoanNumber,
  t.TLoanID,
  DATE_FORMAT(t.RequiredDate, "%d-%m-%Y") AS 'StartDate',
  DATE_FORMAT(DATE_ADD(t.RequiredDate, INTERVAL t.duration DAY), "%d-%m-%Y") AS "EndDate",
  c.CompanyName,
  t.CustomerEmail,
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, Company c where TLoanStatusID = "8" AND 
  t.CompanyID = c.CompanyID;`;
  return knex.raw(query);
}

module.exports.getManagerLoan = async () => {
  const query = `
  SELECT t.TLoanNumber, 
  DATE_FORMAT(t.ApplicationDate, "%d-%m-%Y") AS 'StartDate',
  t.Requestor,
  tt.TLoanType,
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, TLoanType tt where t.TLoanStatusID = "1" AND 
  t.TLoanTypeID = tt.TLoanTypeID;`;
  return knex.raw(query);
}

module.exports.getManagerExtension = async () => {
  const query = `
  SELECT t.TLoanNumber, 
  DATE_FORMAT(t.ApplicationDate, "%d-%m-%Y") AS 'StartDate',
  t.Requestor,
  tt.TLoanType
  count(t.TLoanNumber) OVER() AS full_count
  FROM TLoan t, TLoanType tt where t.TLoanStatusID = "" AND 
  t.TLoanTypeID = tt.TLoanTypeID;`;
  return knex.raw(query);
}

module.exports.approveLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 3,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};

//Add status to db
module.exports.rejectLoan = async (TLoanNumber, remarks) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', TLoanNumber)
          .update({
              TLoanStatusID: 9,
              Remarks:remarks
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};


module.exports.pickLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 5,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};


module.exports.issuedLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 7,
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
              TLoanStatusID: 8,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};


module.exports.readyLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 6,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};


module.exports.draftLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 1,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};


module.exports.loanExtension = async (
  tloanid,
  duration,
  reason

) => {
  return knex('TLoanExtension').insert({
    TLoanID: tloanid,
    TLoanExtensionStatusID: 1,
    Duration: duration,
    Reason: reason
  });
};

module.exports.getID = async(TLoanNumber) => {
  const query = `   SELECT 
	TLoanID
  FROM TLoan
  WHERE TLoanNumber = ?
 `
  return knex.raw(query, [TLoanNumber])
}