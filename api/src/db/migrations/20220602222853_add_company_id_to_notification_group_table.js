/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('NotiGroup', function(table) {
        table.integer('CompanyID').unsigned();
        table.foreign('CompanyID').references('CompanyID').inTable('Company').onDelete('set null').onUpdate('cascade');
        table.index(['CompanyID'], 'FK_NotiGroup_Company_CompanyID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('NotiGroup', function(table) {
        table.dropForeign(['CompanyID'], 'FK_NotiGroup_Company_CompanyID');
        table.dropColumn('CompanyID');
    });
};
