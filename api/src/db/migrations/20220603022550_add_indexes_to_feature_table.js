/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('Feature', function(table) {
        table.index(['FeatureName'], 'FK_Feature_FeatureName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('Feature', function(table) {
        table.dropIndex(['FeatureName'], 'FK_Feature_FeatureName_idx');
    });
};
