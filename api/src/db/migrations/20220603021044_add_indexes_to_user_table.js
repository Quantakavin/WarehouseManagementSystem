/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('User', (table) => {
        table.index(['Username'], 'FK_User_Username_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('User', (table) => {
        table.dropIndex(['Username'], 'FK_User_Username_idx');
    });
};
