/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('UserGroup', (table) => {
        table.index(['UserGroupName'], 'FK_UserGroup_UserGroupName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('UserGroup', (table) => {
        table.dropIndex(['UserGroupName'], 'FK_UserGroup_UserGroupName_idx');
    });
};
