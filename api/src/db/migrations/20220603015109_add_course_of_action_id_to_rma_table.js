/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('Rma', function (table) {
        table.integer('CourseOfActionID').unsigned();
        table
            .foreign('CourseOfActionID')
            .references('CourseOfActionID')
            .inTable('CourseOfAction')
            .onDelete('set null')
            .onUpdate('cascade');
        table.index(['CourseOfActionID'], 'FK_Rma_CourseOfAction_CourseOfActionID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('Rma', function (table) {
        table.dropForeign(['CourseOfActionID'], 'FK_Rma_CourseOfAction_CourseOfActionID');
        table.dropColumn('CourseOfActionID');
    });
};
