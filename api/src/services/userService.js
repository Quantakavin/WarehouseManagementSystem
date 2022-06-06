const knex = require('../config/database')

/*
module.exports.insert = async (name, email, password) => {
    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`
    const values = [name, email, password]
    return connection.query(insertUserQuery, values)
}
*/


module.exports.findByEmail = async (email) => {
    return knex.select('UserID,Username,Password').from('User')
}