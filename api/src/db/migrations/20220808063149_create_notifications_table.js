/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Notification', function (table) {
        table.integer('NotiFeatureID').notNullable();
        table.integer("Read").defaultTo(0);
        table
            .foreign('NotiFeatureID')
            .references('NotiFeatureID')
            .inTable('NotiFeature')
            .onDelete('cascade')
            .onUpdate('cascade');
        table.index(['NotiFeatureID'], 'FK_Notification_NotiFeature_NotiFeatureID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Notification');
};
