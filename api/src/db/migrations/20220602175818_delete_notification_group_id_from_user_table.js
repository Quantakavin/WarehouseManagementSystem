/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('User', (table) => {
        table.dropForeign(['NotiGroupID'], 'FK_User_NotiGroup_NotiGroupID');
        table.dropColumn('NotiGroupID');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('User', (table) => {
        table.integer('NotiGroupID');
        table.foreign('NotiGroupID').references('NotiGroupID').inTable('NotiGroup');
    });
};
