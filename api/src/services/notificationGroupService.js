const knex = require('../config/database');

module.exports.getByUser = async (userid) => {
    const query = `SELECT n.NotiGroupName FROM NotiGroup n INNER JOIN UserNotiGroup un ON un.NotiGroupID=n.NotiGroupID INNER JOIN User u ON un.UserID = u.UserID WHERE u.UserID = ?`;
    return knex.raw(query, [userid]);
};

module.exports.assignToUser = async (userid, notigroupid) => {
    return knex('UserNotiGroup').insert({
        UserID: userid,
        NotiGroupID: notigroupid
    });
};

module.exports.getAll = async (pageSize, pageNo, sortColumn, sortOrder, name ) => {
    const query = `Call sp_getAllNotiGroups(?,?,?,?,?)`;
    return knex.raw(query, [Number(pageSize), Number(pageNo), sortColumn, sortOrder, name ]);
};

// module.exports.getAll = async (limit, page) => {
//     const query = `SELECT NotiGroupID, NotiGroupName, NotiGroupDesc, count(NotiGroupID) OVER() AS full_count FROM NotiGroup LIMIT ? OFFSET ?`;
//     return knex.raw(query, [Number(limit), Number(page)]);
// };

module.exports.getByID = async (notiGroupID) => {
    const query = `SELECT NotiGroupName, NotiGroupDesc FROM NotiGroup WHERE NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
};

module.exports.getByName = async (name) => {
    const query = `SELECT NotiGroupID, NotiGroupName, NotiGroupDesc FROM NotiGroup WHERE NotiGroupName LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.getNotifications = async (notiGroupID) => {
    const query = `SELECT f.NotiFeatureID, f.NotiFeature, t.NotiType FROM NotiGroupFeature g INNER JOIN NotiFeature f ON f.NotiFeatureID = g.NotiFeatureID INNER JOIN NotiType t ON t.NotiTypeID = g.NotiTypeID WHERE g.NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
};

module.exports.insert = async (name, description, company, notifications) => {
    return knex.transaction((trx) => {
        knex.insert(
            { NotiGroupName: name, NotiGroupDesc: description, CompanyID: company },
            'NotiGroupID'
        )
            .into('NotiGroup')
            .transacting(trx)
            .then((ids) => {
                if (notifications.length > 0) {
                    notifications.forEach((notification) => {
                        [notification.NotiGroupID] = ids; // eslint-disable-line no-param-reassign
                    });
                    return knex('NotiGroupFeature').insert(notifications).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.update = async (notiGroupID, name, description, company, notifications) => {
    return knex.transaction((trx) => {
        knex('NotiGroup')
            .where('NotiGroupID', notiGroupID)
            .update({
                NotiGroupName: name,
                NotiGroupDesc: description,
                CompanyID: company
            })
            .transacting(trx)
            .then(() => {
                return knex('NotiGroupFeature')
                    .where('NotiGroupID', notiGroupID)
                    .del()
                    .transacting(trx);
            })
            .then(() => {
                if (notifications.length > 0) {
                    notifications.forEach((notification) => {
                        notification.NotiGroupID = notiGroupID; // eslint-disable-line no-param-reassign
                    });
                    return knex('NotiGroupFeature').insert(notifications).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.delete = async (notiGroupID) => {
    return knex.transaction((trx) => {
        knex('NotiGroupFeature')
            .where('NotiGroupID', notiGroupID)
            .del()
            .transacting(trx)
            .then(() => {
                return knex('NotiGroup').where('NotiGroupID', notiGroupID).del().transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};
