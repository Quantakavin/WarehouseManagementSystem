const knex = require('../config/database');

module.exports.insert = async (NotiFeatureID, ReceiverID,ContentID) => {

    return knex.insert({ NotiFeatureID: NotiFeatureID, ReceiverID: ReceiverID, Read: 0, ContentID: ContentID}, 'NotificationID')
        .into('Notification');
};

module.exports.getById = async (UserID) => {
    const query = `SELECT nf.NotiFeatureID, nf.NotiFeature, nf.NotiMessage, n.Read, n.ReceiverID, n.NotificationID, n.ContentID, nf.Icon, nf.Url FROM Notification n INNER JOIN NotiFeature nf ON n.NotiFeatureID = nf.NotiFeatureID WHERE n.ReceiverID = ? ORDER BY n.NotificationID DESC`;
    return knex.raw(query, [UserID]);
};

module.exports.markAllAsRead = async (UserID) => {
    return knex('Notification').update({ Read: 1 }).where({ReceiverID: UserID});
};