/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('NotiGroup', (table) => {
        table.index(['NotiGroupName'], 'FK_NotiGroup_NotiGroupName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('NotiGroup', (table) => {
        table.dropIndex(['NotiGroupName'], 'FK_NotiGroup_NotiGroupName_idx');
    });
};
