/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('NotiGroup', (table) => {
        table.integer('CompanyID').unsigned();
        table
            .foreign('CompanyID')
            .references('CompanyID')
            .inTable('Company')
            .onDelete('set null')
            .onUpdate('cascade');
        table.index(['CompanyID'], 'FK_NotiGroup_Company_CompanyID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.table('NotiGroup', (table) => {
        table.dropForeign(['CompanyID'], 'FK_NotiGroup_Company_CompanyID');
        table.dropColumn('CompanyID');
    });
};
