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

