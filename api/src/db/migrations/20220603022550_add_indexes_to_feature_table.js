/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('Feature', (table) => {
        table.index(['FeatureName'], 'FK_Feature_FeatureName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('Feature', (table) => {
        table.dropIndex(['FeatureName'], 'FK_Feature_FeatureName_idx');
    });
};
