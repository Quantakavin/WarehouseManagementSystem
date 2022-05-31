//database connection
//more imports

exports.getAllRMA = async () => {
    try {
      // const ORDER_BY = 'ORDER BY created_at ASC';
      // const LIMIT = 'LIMIT 25';
  
      //const query = `SELECT * FROM "RMA" ${ORDER_BY} ${LIMIT}`;
  
      const result = await connection.query(query);
      if (!result) return null;
  
      return result.rows;
    } catch (e) {
      console.log({ e });
      return null;
    }
  };

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