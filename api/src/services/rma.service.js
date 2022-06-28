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
      RmaStatusID: 1,
      Instruction: instruction
  });
}

module.exports.updateRmaAccepted = async (rmaNo) => {
  return knex.transaction((trx) => {
      knex('Rma')
          .where('RMANo', rmaNo)
          .update({
              RmaStatusID: 2,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};

module.exports.updateRmaRejected = async (rmaNo) => {
  return knex.transaction((trx) => {
      knex('Rma')
          .where('RMANo', rmaNo)
          .update({
              RmaStatusID: 3,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};

module.exports.updateProductReceived = async (rmaNo) => {
  return knex.transaction((trx) => {
      knex('Rma')
          .where('RMANo', rmaNo)
          .update({
              RmaStatusID: 4,
          })
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
  });
};

module.exports.updateRmaInstructions = async (rmaNo, instruction) => {
  return knex.transaction((trx) => {
    knex('Rma')
        .where('RMANo', rmaNo)
        .update({
            Instruction: instruction,
            RmaStatusID: 5,
        })
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback);
});
}

module.exports.updateRmaCOA = async (rmaNo, actiontaken) => {
  return knex.transaction((trx) => {
    knex('Rma')
        .where('RMANo', rmaNo)
        .update({
            CourseOfAction: actiontaken,
        })
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback);
});
}