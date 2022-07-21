

const knex = require('../config/database');

module.exports.getByEmail = async (email) => {
    // return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT u.Active, u.UserID, u.Username, u.Password, g.UserGroupName FROM User u LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.Email = ?`;
    return knex.raw(query, [email]);
};

module.exports.getNames = async ( name ) => {
    const query = `SELECT DISTINCT IFNULL(Username, NULL) 'Name' FROM User WHERE Username LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.getAll = async (pageSize, pageNo, sortColumn, sortOrder, name ) => {
    const query = `Call sp_getAllUsers(?,?,?,?,?)`;
    return knex.raw(query, [Number(pageSize), Number(pageNo), sortColumn, sortOrder, name ]);
};

// module.exports.getAll = async (limit, page) => {
//     const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo', count(UserID) OVER() AS full_count FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID LIMIT ? OFFSET ?`;
//     return knex.raw(query, [Number(limit), Number(page)]);
// };

module.exports.getByID = async (userID) => {
    const query = `SELECT u.Username, u.Email, c.CompanyName, c.CompanyID, g.UserGroupName, g.UserGroupID, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.UserID = ?`;
    return knex.raw(query, [userID]);
};

module.exports.getByName = async (name) => {
    const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.Username LIKE ?`;
    return knex.raw(query, [`%${name}%`]);
};

module.exports.insert = async (name, email, password, mobileno, company, usergroup, notigroups) => {
    /*
    return knex('User').insert({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: 'Y'
    });
    */
    return knex.transaction((trx) => {
        knex.insert(
            {
                Username: name,
                Email: email,
                Password: password,
                MobileNo: mobileno,
                CompanyID: company,
                UserGroupID: usergroup,
                Active: 'Y'
            },
            'UserID'
        )
            .into('User')
            .transacting(trx)
            .then((ids) => {
                if (notigroups.length > 0) {
                    notigroups.forEach((notigroup) => {
                        [notigroup.UserID] = ids; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserNotiGroup').insert(notigroups).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.update = async (
    userID,
    name,
    email,
    password,
    mobileno,
    company,
    usergroup,
    active,
    notigroups
) => {
    /*
    return knex('User').where('UserID', userID).update({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: active
    });
    */
    return knex.transaction((trx) => {
        knex('User')
            .where('UserID', userID)
            .update({
                Username: name,
                Email: email,
                Password: password,
                MobileNo: mobileno,
                CompanyID: company,
                UserGroupID: usergroup,
                Active: active
            })
            .transacting(trx)
            .then(() => {
                return knex('UserNotiGroup').where('UserID', userID).del().transacting(trx);
            })
            .then(() => {
                if (notigroups.length > 0) {
                    notigroups.forEach((notigroup) => {
                        notigroup.UserID = userID; // eslint-disable-line no-param-reassign
                    });
                    return knex('UserNotiGroup').insert(notigroups).transacting(trx);
                }
                return null;
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
};

module.exports.getByUserGroup = async (userGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM User WHERE UserGroupID = ?`;
    return knex.raw(query, [userGroupID]);
};

module.exports.getByNotificationGroup = async (notiGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM UserNotiGroup WHERE NotiGroupID = ?`;
    return knex.raw(query, [notiGroupID]);
};

module.exports.checkTLoansAndRMA = async (userID) => {
    const query = `SELECT Count(UserID) 'Count' FROM (SELECT UserID FROM TLoan WHERE UserID = ? UNION SELECT SalesmanID 'UserID' FROM Rma WHERE SalesmanID = ?) AS T`
    return knex.raw(query, [userID, userID]);
}

module.exports.delete = async (userID) => {
    return knex('User').where('UserID', userID).del()
};