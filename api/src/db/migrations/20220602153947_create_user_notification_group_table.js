/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('UserNotiGroup', (table) => {
        table.integer('UserID').notNullable();
        table.integer('NotiGroupID').notNullable();
        table
            .foreign('UserID')
            .references('UserID')
            .inTable('User')
            .onDelete('cascade')
            .onUpdate('cascade');
        table
            .foreign('NotiGroupID')
            .references('NotiGroupID')
            .inTable('NotiGroup')
            .onDelete('cascade')
            .onUpdate('cascade');
        table.index(['UserID'], 'FK_UserNotiGroup_User_UserID_idx');
        table.index(['NotiGroupID'], 'FK_UserNotiGroup_NotiGroup_NotiGroupID_idx');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('UserNotiGroup');
};
