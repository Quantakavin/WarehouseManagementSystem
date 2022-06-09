/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  return knex('User').del()
    .then(function () {
      return knex('User').insert([
        {UserID: 1, CompanyID: 2, SAPUserID: 9998, FirstName: 'Peter Wong', Username: 'peterwong', Password: '81dc9bdb52d04dc20036dbd8313ed055', MobileNo: '91851560', Email: 'peterwong@leaptron.com', Active: 'Y', UserGroupID: 1, SAPUser: 'N', Deleted: 0, DeleteFlag: 1},
        {UserID: 3, CompanyID: 2, SAPUserID: 9999, FirstName: 'Kelyn Wong', Username: 'kelynwong', Password: '81dc9bdb52d04dc20036dbd8313ed055', MobileNo: '77777777', Email: 'kelynwonget@gmail.com', Active: 'Y', UserGroupID: 1, SAPUser: 'N', Deleted: 0, DeleteFlag: 1},
      ]);
    });
};
