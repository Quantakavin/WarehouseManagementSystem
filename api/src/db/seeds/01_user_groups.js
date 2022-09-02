/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    // Deletes ALL existing entries
    /*
  await knex('UserGroups').del()
  await knex('UserGroups').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
  */

    return knex('UserGroup')
        .del()
        .then(() => {
            return knex('UserGroup').insert([
                {
                    UserGroupID: 1,
                    UserGroupName: 'Sales Admin',
                    UserGroupDesc: 'Deals with administrative tasks and paperwork'
                },
                {
                    UserGroupID: 2,
                    UserGroupName: 'Warehouse Worker',
                    UserGroupDesc: 'Store personnel working at the warehouse'
                },
                {
                    UserGroupID: 3,
                    UserGroupName: 'Sales Engineer',
                    UserGroupDesc: 'Sales people who deal with customers'
                },
                {
                    UserGroupID: 4,
                    UserGroupName: 'Sales Manager',
                    UserGroupDesc: 'In charge of managing sales engineers'
                },
                {
                    UserGroupID: 5,
                    UserGroupName: 'Technical Staff',
                    UserGroupDesc: 'Involved with repair and maintainence of equipment'
                },
                {
                    UserGroupID: 6,
                    UserGroupName: 'Admin',
                    UserGroupDesc: 'Super admin of the website'
                }
            ]);
        });
};
