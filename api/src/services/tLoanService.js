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

