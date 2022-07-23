/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('NotiFeature', function (table) {
        table.index(['NotiFeature'], 'FK_NotiFeature_NotiFeature_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('NotiFeature', function (table) {
        table.dropIndex(['NotiFeature'], 'FK_NotiFeature_NotiFeature_idx');
    });
};
