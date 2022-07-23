/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('User', function (table) {
        table.index(['Username'], 'FK_User_Username_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('User', function (table) {
        table.dropIndex(['Username'], 'FK_User_Username_idx');
    });
};
