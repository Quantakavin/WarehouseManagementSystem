exports.Test = async () => {
  const result = 'Test';
  return result;
};

exports.getAllProducts = async () => {
  try {
    const query = `SELECT * FROM BinProduct ORDER BY ItemName ASC LIMIT 10`;

    const result = await connection.query(query);
    if (!result) return null;

    return result.rows;
  } catch (e) {
    console.log({e});
    return null;
  }
};

exports.getByItemNo = async (ItemNo) => {
  try {
    const ITEM_NO = ItemNo;

    const query = `SELECT * FROM BinProduct WHERE ItemNo = ${ITEM_NO}`;

    const result = await connection.query(query);
    if (!result) return null;

    return result.rows[0];
  } catch (e) {
    console.log({e});
    return null;
  }
};