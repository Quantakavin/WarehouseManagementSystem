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

module.exports.insert = async (name, email, password, mobileno, company, usergroup) => {
    return knex('User').insert({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: 'Y'
    });
}

module.exports.update = async (userID, name, email, password, mobileno, company, usergroup, active) => {
    return knex('User').where('UserID', userID).update({
        Username: name,
        Email: email,
        Password: password,
        MobileNo: mobileno,
        CompanyID: company,
        UserGroupID: usergroup,
        Active: active
    });
}

module.exports.getByUserGroup = async (userGroupID) => {
    const query = `SELECT Count(UserID) 'Count' FROM User WHERE UserGroupID = ?`;
    return knex.raw(query, [userGroupID]);
}
