/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    return knex('UserNotiGroup')
        .del()
        .then(function () {
            return knex('UserNotiGroup').insert([
                { UserID: 1, NotiGroupID: 1 },
                { UserID: 1, NotiGroupID: 3 },
                { UserID: 3, NotiGroupID: 1 }
            ]);
        });
};
