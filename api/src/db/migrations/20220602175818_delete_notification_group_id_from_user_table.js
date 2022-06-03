/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.table('User', function(table) {
        table.dropForeign(['NotiGroupID'], 'FK_User_NotiGroup_NotiGroupID')
        table.dropColumn('NotiGroupID')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('User', function(table) {
        table.integer('NotiGroupID');
        table.foreign('NotiGroupID').references('NotiGroupID').inTable('NotiGroup');
    });
};