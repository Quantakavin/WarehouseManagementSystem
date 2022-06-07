const knex = require('../config/database')
//more imports

module.exports.getAll = async () => {
  const query = `SELECT * FROM RMA`;
  return knex.raw(query);
}

module.exports.getByRMANo = async (userID) => {
  const query = `SELECT * FROM RMA WHERE RMANo = ?`;
  return knex.raw(query, [RMANo]);
}

  exports.create = async (data) => {
    try {
      const {  } = data;
  
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
  
      const values = {  };
      const columns = Object.keys(values);
      const rows = Object.values(values);
      const queryColumns = columns.join(',');
      const queryRows = serializer.SQLRows(rows).join(',');
  
      // Creating RMA
      // stored procedure to create RMA
  
      const result = await connection.query(query);
      if (!result) throw Error('RMA Not Created!');
  
    //   const id = result.rows[0]?.rma_id;
  
    //   return { id };
    } catch (e) {
      console.log({ e });
      return null;
    }
  };

  //Approve/Reject
  module.exports.updateARStatus = async () => {
    return knex('RMA').where('RMANo', RMANo).update({
        // RmaStatus: name,
    });
}
  //Enter instructions
  exports.updateInstruction = async (key, payload) => {
    try {
      // const updated_at = new Date().toISOString();
  
      // const data = { ...payload, updated_at };
  
      // const columns = Object.keys(data);
      // const rows = Object.values(data);
      // const values = columns.map((col, i) => `${col}='${rows[i]}'`);
  
      // const query = `UPDATE RMA SET ${values.join(',')} WHERE rma_id=${key}`;
  
      const result = await connection.query(query);
      if (!result) return null;
  
      // const id = key;
  
      // return { id };
    } catch (e) {
      console.log({ e });
      return null;
    }
  };

  //Enter action taken
  exports.updateActionTaken = async (key, payload) => {
    try {
      // const updated_at = new Date().toISOString();
  
      // const data = { ...payload, updated_at };
  
      // const columns = Object.keys(data);
      // const rows = Object.values(data);
      // const values = columns.map((col, i) => `${col}='${rows[i]}'`);
  
      // const query = `UPDATE RMA SET ${values.join(',')} WHERE rma_id=${key}`;
  
      const result = await connection.query(query);
      if (!result) return null;
  
      // const id = key;
  
      // return { id };
    } catch (e) {
      console.log({ e });
      return null;
    }
  };