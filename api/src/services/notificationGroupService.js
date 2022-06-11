const knex = require('../config/database')

module.exports.getByUser = async (userid) => {
    const query = `SELECT n.NotiGroupName FROM NotiGroup n INNER JOIN UserNotiGroup un ON un.NotiGroupID=n.NotiGroupID INNER JOIN User u ON un.UserID = u.UserID WHERE u.UserID = ?`;
    return knex.raw(query, [userid]);
}

module.exports.assignToUser = async (userid, notigroupid) => {
    return knex('UserNotiGroup').insert({
        UserID: userid,
        NotiGroupID: notigroupid,
    });
}

module.exports.getAll = async () => {
    const query = `SELECT NotiGroupID, NotiGroupName, NotiGroupDesc FROM NotiGroup`;
    return knex.raw(query);
}

module.exports.getByID = async (notiGroupID) => {
    const query = `SELECT NotiGroupName, NotiGroupDesc FROM NotiGroup WHERE NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
}

module.exports.getByName = async (name) => {
    const query = `SELECT NotiGroupID, NotiGroupName, NotiGroupDesc FROM NotiGroup WHERE NotiGroupName LIKE ?`;
    return knex.raw(query, [ '%' + name + '%']);
}


module.exports.getNotifications = async (notiGroupID) => {
    const query = `SELECT f.NotiFeature, t.NotiType FROM NotiGroupFeature g INNER JOIN NotiFeature f ON f.NotiFeatureID = g.NotiFeatureID INNER JOIN NotiType t ON t.NotiTypeID = g.NotiTypeID WHERE g.NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
}