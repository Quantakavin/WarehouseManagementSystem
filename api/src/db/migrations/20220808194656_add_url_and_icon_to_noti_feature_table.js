/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('NotiFeature', function (table) {
        table.string('Url')
        table.string('Icon')
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    table.dropColumn('Url');
    table.dropColumn('Icon');
};
