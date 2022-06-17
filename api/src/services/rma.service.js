const knex = require('../config/database');

module.exports.getByRMANO = async (RMANo) => {
  //return knex.where('Email', email).select('UserID','Username','Password').from('User')
  const query = `SELECT * FROM Rma WHERE RMANo = ?`;
  return knex.raw(query, [RMANo]);
}

module.exports.getByStatusID = async (RmaStatusID) => {
  //return knex.where('Email', email).select('UserID','Username','Password').from('User')
  const query = `SELECT * FROM Rma r LEFT JOIN RmaStatus s ON r.RmaStatusID = s.RmaStatusID WHERE r.RmaStatusID = ?`;
  return knex.raw(query, [RmaStatusID]);
}

module.exports.getAll = async () => {
  const query = `SELECT * FROM Rma`;
  return knex.raw(query);
}

  exports.getByRMANO = async (RMANO) => {
    try {
      //stored procedure to get RMA matching rmano
  
      const result = await connection.query(query);
      if (!result) return null;
  
      return result.rows[0];
    } catch (e) {
      console.log({ e });
      return null;
    }
  };
  
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

module.exports.updateStatus = async (rmastatusID, status) => {
  return knex('RmaStatus').where('RmaStatusID', rmastatusID).update({
      RmaStatus: status
  });
}

module.exports.updateInstructions = async (RMANo, instruction) => {
  return knex('Rma').where('UserRMANo', RMANo).update({
      Instruction: instruction
  });
}