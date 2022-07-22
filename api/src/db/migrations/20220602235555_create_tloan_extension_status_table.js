/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('TLoanExtensionStatus', function (table) {
        table.increments('TLoanExtensionStatusID').primary().unsigned();
        table.string('TLoanExtensionStatus', 255).unique();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('TLoanExtensionStatus');
};
