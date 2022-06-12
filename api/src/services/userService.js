const knex = require('../config/database')

module.exports.getByEmail = async (email) => {
    //return knex.where('Email', email).select('UserID','Username','Password').from('User')
    const query = `SELECT u.UserID, u.Username, u.Password, g.UserGroupName FROM User u LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.Email = ?`;
    return knex.raw(query, [email]);
}

module.exports.getAll = async () => {
    const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo' FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID`;
    return knex.raw(query);
}

module.exports.getByID = async (userID) => {
    const query = `SELECT u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.UserID = ?`;
    return knex.raw(query, [userID]);
}

module.exports.getByName = async (name) => {
    const query = `SELECT u.UserID, u.Username, u.Email, c.CompanyName, g.UserGroupName, IFNULL(u.MobileNo, 'NULL') 'MobileNo'  FROM User u LEFT JOIN Company c ON u.CompanyID = c.CompanyID LEFT JOIN UserGroup g ON u.UserGroupID = g.UserGroupID WHERE u.Username LIKE ?`;
    return knex.raw(query, [ '%' + name + '%']);
}

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
        knex.insert({
            Username: name,
            Email: email,
            Password: password,
            MobileNo: mobileno,
            CompanyID: company,
            UserGroupID: usergroup,
            Active: 'Y'
        }, 'UserID')
        .into('User')
        .transacting(trx)
        .then((ids) => {
            if (notigroups.length > 0) {
                notigroups.forEach((notigroup) => notigroup.UserID = ids[0]);
                return knex('UserNotiGroup').insert(notigroups).transacting(trx);
            }
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
}


module.exports.update = async (userID, name, email, password, mobileno, company, usergroup, active, notigroups) => {
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
        knex('User').where('UserID', userID).update({
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
            return knex('UserNotiGroup').where('UserID', userID).del().transacting(trx)
        })
        .then(() => {
            if (notigroups.length > 0) {
                notigroups.forEach((notigroup) => notigroup.UserID = userID);
                return knex('UserNotiGroup').insert(notigroups).transacting(trx);
            }
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
}

module.exports.getByUserGroup = async (userGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM User WHERE UserGroupID = ?`;
    return knex.raw(query, [userGroupID]);
}
