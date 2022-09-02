/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.table('Notification', (table) => {
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
exports.down = (knex) => {
    return knex.schema.table('NotiGroup', (table) => {
        table.dropForeign(['ReceiverID'], 'FK_Notification_User_UserID');
        table.dropColumn('ReceiverID');
    });
};
