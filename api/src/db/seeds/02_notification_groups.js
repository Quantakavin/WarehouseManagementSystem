/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  return knex('NotiGroup').del()
   .then(function () {
    return knex('NotiGroup').insert([
      {NotiGroupID: 1, NotiGroupName: 'Sales admin', NotiGroupDesc: 'Notifications for sales admins', CompanyID: 2},
      {NotiGroupID: 2, NotiGroupName: 'Maintainence', NotiGroupDesc: 'Notifications for maintainence', CompanyID: 2},
      {NotiGroupID: 3, NotiGroupName: 'Management', NotiGroupDesc: 'Notifications for for management', CompanyID: 2}
    ]);
   });
}; 
