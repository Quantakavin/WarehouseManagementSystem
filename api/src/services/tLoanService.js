const knex = require('../config/database')



module.exports.getAll = async () => {
  const query = `SELECT * FROM TLoan`;
  return knex.raw(query);
}

module.exports.createTLoan = async (type, company, number, name, purpose, applicationdate, duration, requireddate, status, pick, remarks) => {
  return knex('TLoan').insert({
    TLoanTypeID: type,
    CompanyID: company,
    TLoanNumber: number,
    Requestor: name,
    Purpose: purpose,
    ApplicationDate: applicationdate,
    Duration: duration,
    RequiredDate: requireddate,
    TLoanStatusID: status,
    PickStatusID: pick,
    Remarks: remarks
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
  const query = `SELECT * FROM TLoan where TLoanStatusID = "3"`;
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
  return knex('TLoan').update({
    TLoanStatusID: 5
  }).where('TLoanNumber', number)
  // transaction((trx) => {
  //     knex('TLoan')
  //         .where('TLoanNumber', number)
  //         .update({
  //             TLoanStatusID: 5,
  //         })
  //         .transacting(trx)
  //         .then(trx.commit)
  //         .catch(trx.rollback);
  // });
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

