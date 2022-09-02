/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('TLoanExtension', (table) => {
        table.increments('TLoanExtensionID').primary().unsigned();
        table.bigint('TLoanID').notNullable().unsigned();
        table.integer('TLoanExtensionStatusID').unsigned();
        table.integer('Duration').notNullable().unsigned();
        table.string('Reason', 255);
        table
            .foreign('TLoanID')
            .references('TLoanID')
            .inTable('TLoan')
            .onDelete('cascade')
            .onUpdate('cascade');
        table
            .foreign('TLoanExtensionStatusID')
            .references('TLoanExtensionStatusID')
            .inTable('TLoanExtensionStatus')
            .onDelete('set null')
            .onUpdate('cascade');
        table.index(['TLoanID'], 'FK_TLoanExtension_TLoan_TLoanID_idx');
        table.index(['TLoanExtensionStatusID'], 'FK_TLoanExtension_Status_StatusID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('TLoanExtension');
};
