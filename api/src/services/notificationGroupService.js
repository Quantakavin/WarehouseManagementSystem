const knex = require('../config/database')

module.exports.getByUser = async (userid) => {
    //return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT n.NotiGroupName FROM NotiGroup n INNER JOIN UserNotiGroup un ON un.NotiGroupID=n.NotiGroupID INNER JOIN User u ON un.UserID = u.UserID WHERE u.UserID = ?`;
    return knex.raw(query, [userid]);
}
