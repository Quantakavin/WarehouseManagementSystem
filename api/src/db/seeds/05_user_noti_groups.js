/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    return knex('UserNotiGroup')
        .del()
        .then(() => {
            return knex('UserNotiGroup').insert([
                { UserID: 1, NotiGroupID: 1 },
                { UserID: 1, NotiGroupID: 3 },
                { UserID: 3, NotiGroupID: 1 }
            ]);
        });
};
