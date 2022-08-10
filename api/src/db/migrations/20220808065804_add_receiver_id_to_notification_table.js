/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('Notification', function (table) {
        table.integer('ReceiverID');
        table
            .foreign('ReceiverID')
            .references('UserID')
            .inTable('User')
            .onDelete('cascade')
            .onUpdate('cascade');
        table.index(['ReceiverID'], 'FK_Notification_User_UserID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('NotiGroup', function (table) {
        table.dropForeign(['ReceiverID'], 'FK_Notification_User_UserID');
        table.dropColumn('ReceiverID');
    });
};
