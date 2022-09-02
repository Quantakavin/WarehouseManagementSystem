/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('NotiFeature', (table) => {
        table.string('Url');
        table.string('Icon');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('NotiFeature', (table) => {
        table.dropColumn('Url');
        table.dropColumn('Icon');
    });
};
