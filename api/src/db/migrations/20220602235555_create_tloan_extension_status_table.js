/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('TLoanExtensionStatus', (table) => {
        table.increments('TLoanExtensionStatusID').primary().unsigned();
        table.string('TLoanExtensionStatus', 255).unique();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('TLoanExtensionStatus');
};
