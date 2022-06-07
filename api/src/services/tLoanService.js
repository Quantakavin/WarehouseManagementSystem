const knex = require('../config/database')



module.exports.getAll = async () => {
  const query = `SELECT * FROM TLoan`;
  return knex.raw(query);
}

module.exports.createTLoan = async (TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks) => {
  return knex('TLoan').insert({
    TLoanTypeID: TLoanTypeID,
    CompanyID: CompanyID,
    TLoanNumber: TLoanNumber,
    Requestor: Requestor,
    Purpose: Purpose,
    ApplicationDate: ApplicationDate,
    Duration: Duration,
    RequiredDate: RequiredDate,
    TLoanStatusID: TLoanStatusID,
    PickStatus: PickStatus,
    Remarks:Remarks
  })

}



