const knex = require('../config/database')



module.exports.getAll = async () => {
  const query = `SELECT * FROM TLoan`;
  return knex.raw(query);
}

module.exports.tloanOutItem = async (
  itemno,
  itemname,
  quantity
) => {
  return knex('TLoanOutItem').insert({
    itemno,
    itemname,
    quantity
  });
};

// module.exports.tloanOutItemBatch = async (
//   itemno,
//   itemname,
//   quantity
// ) => {
//   return knex('TLoanOutItem').insert({
//     itemno,
//     itemname,
//     quantity
//   });
// };


module.exports.createTLoan = async (type, company, number, name, purpose, applicationdate, duration, requireddate, pick, remarks, tloanItems, tloanBatch) => {
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
      PickStatusID: pick,
      Remarks: remarks
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
  const query = `SELECT * FROM TLoan where TLoanNumber = ?`
  return knex.raw(query, [TLoanNumber])
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
  const query = `SELECT * FROM TLoan where TLoanStatusID IN (3,5,6,7)`;
  return knex.raw(query);
}

module.exports.getPending = async () => {
  const query = `SELECT * FROM TLoan where TLoanStatusID = "4"`;
  return knex.raw(query);
}

module.exports.getDraft = async () => {
  const query = `SELECT * FROM TLoan where TLoanStatusID = "1"`;
  return knex.raw(query);
}

module.exports.getHistory = async () => {
  const query = `SELECT * FROM TLoan where TLoanStatusID = "8"`;
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
module.exports.rejectLoan = async (number) => {
  return knex.transaction((trx) => {
      knex('TLoan')
          .where('TLoanNumber', number)
          .update({
              TLoanStatusID: 9,
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


