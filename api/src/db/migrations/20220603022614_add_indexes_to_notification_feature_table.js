/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('NotiFeature', (table) => {
        table.index(['NotiFeature'], 'FK_NotiFeature_NotiFeature_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('NotiFeature', (table) => {
        table.dropIndex(['NotiFeature'], 'FK_NotiFeature_NotiFeature_idx');
    });
};
