/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('UserGroup', function (table) {
        table.index(['UserGroupName'], 'FK_UserGroup_UserGroupName_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('UserGroup', function (table) {
        table.dropIndex(['UserGroupName'], 'FK_UserGroup_UserGroupName_idx');
    });
};
