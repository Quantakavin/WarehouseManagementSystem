/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('NotiGroup', function(table) {
        table.index(['NotiGroupName'], 'FK_NotiGroup_NotiGroupName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('NotiGroup', function(table) {
        table.dropIndex(['NotiGroupName'], 'FK_NotiGroup_NotiGroupName_idx');
    });
};
