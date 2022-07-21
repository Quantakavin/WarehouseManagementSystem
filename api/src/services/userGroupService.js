const knex = require('../config/database');

module.exports.getAll = async () => {
    const query = `SELECT UserGroupID, UserGroupName FROM UserGroup`;
    return knex.raw(query);
};

module.exports.filter = async (pageSize, pageNo, sortColumn, sortOrder, name ) => {
    const query = `Call sp_getAllUserGroups(?,?,?,?,?)`;
    return knex.raw(query, [Number(pageSize), Number(pageNo), sortColumn, sortOrder, name ]);
};


// module.exports.getAll = async (limit, page) => {
//     const query = `SELECT UserGroupID, UserGroupName, UserGroupDesc, count(UserGroupID) OVER() AS full_count FROM UserGroup LIMIT ? OFFSET ?`;
//     return knex.raw(query, [Number(limit), Number(page)]);
// };

module.exports.getByID = async (userGroupID) => {
    const query = `SELECT UserGroupName, UserGroupDesc FROM UserGroup WHERE UserGroupID = ?`;
    return knex.raw(query, [userGroupID]);
};

module.exports.getNames = async ( name ) => {
    const query = `SELECT DISTINCT IFNULL(UserGroupName, NULL) 'Name' FROM UserGroup WHERE UserGroupName LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.getByName = async (name) => {
    const query = `SELECT UserGroupID, UserGroupName, UserGroupDesc FROM UserGroup WHERE UserGroupName LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.insert = async (name, description, features) => {
    /*
    return knex('UserGroup').insert({
        UserGroupName: name,
        UsergroupDesc: description
    });
    */
    return knex.transaction((trx) => {
        knex.insert({ UserGroupName: name, UserGroupDesc: description }, 'UserGroupID')
            .into('UserGroup')
            .transacting(trx)
            .then((ids) => {
                if (features.length > 0) {
                    features.forEach((feature) => {
                        [feature.UserGroupID] = ids; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserGroupFeature').insert(features).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.update = async (userGroupID, name, description, features) => {
    /*
    return knex('UserGroup').where('UserGroupID', userGroupID).update({
        UserGroupName: name,
        UsergroupDesc: description
    });
    */
    return knex.transaction((trx) => {
        knex('UserGroup')
            .where('UserGroupID', userGroupID)
            .update({
                UserGroupName: name,
                UsergroupDesc: description
            })
            .transacting(trx)
            .then(() => {
                return knex('UserGroupFeature')
                    .where('UserGroupID', userGroupID)
                    .del()
                    .transacting(trx);
            })
            .then(() => {
                if (features.length > 0) {
                    features.forEach((feature) => {
                        feature.UserGroupID = userGroupID; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserGroupFeature').insert(features).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.getFeatures = async (userGroupID) => {
    const query = `SELECT u.FeatureID, f.FeatureName, fr.FeatureRight, fr.FeatureRightID FROM UserGroupFeature u INNER JOIN Feature f ON u.FeatureID = f.FeatureID INNER JOIN FeatureRight fr on u.FeatureRightID = fr.FeatureRightID WHERE u.UserGroupID = ? ORDER BY u.FeatureID`;
    return knex.raw(query, [userGroupID]);
};

module.exports.delete = async (userGroupID) => {
    return knex('UserGroup').where('UserGroupID', userGroupID).del()
};
