//database connection
//more imports

module.exports.getByRMANO = async (email) => {
  //return knex.where('Email', email).select('UserID','Username','Password').from('User')
  const query = `SELECT * FROM Rma WHERE RMANo = ?`;
  return knex.raw(query, [email]);
}

module.exports.getAll = async () => {
  const query = `SELECT * FROM Rma`;
  return knex.raw(query);
}

module.exports.insert = async (DateTime, company, customer, contactperson, contactno, rmano, supplierrma, salesmanid, rmastatusid, instruction,) => {
  return knex('Rma').insert({
      CompanyID: company,
      ContactPerson: contactperson,
      ContactNo: contactno,
      RMANo: rmano,
      SupplierRMA: invoice,
      SalesmanID: salesmanid,
      SupplierRma: supplierrma,
      RmaStatusID: rmastatusid,
      Instruction: instruction
  });
}

module.exports.update = async (rmastatusID, status) => {
  return knex('RmaStatus').where('RmaStatusID', rmastatusID).update({
      RmaStatus: status
  });
}

module.exports.update = async (RMANo, instruction) => {
  return knex('Rma').where('UserRMANo', RMANo).update({
      Instruction: instruction
  });
}