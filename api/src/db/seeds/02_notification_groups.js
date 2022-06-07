/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  return knex('NotificationGroup').truncate()
   .then(function () {
    return knex('NotificationGroup').insert([
      {UserGroupName: 'Sales Engineer', UserGroupDesc: 'Sales people who deal with customers'},
      {UserGroupName: 'Sales Manager', UserGroupDesc: 'In charge of managing sales engineers'},
      {UserGroupName: 'Sales Admin', UserGroupDesc: 'Deals with administrative tasks and paperwork'},
      {UserGroupName: 'Warehouse Worker', UserGroupDesc: 'Store personnel working at the warehouse'},
      {UserGroupName: 'Technical Staff', UserGroupDesc: 'Involved with repair and maintainence of equipment'},
      {UserGroupName: 'Admin', UserGroupDesc: 'Super admin of the website'},
    ]);
   });
};
