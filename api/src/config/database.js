const knexfile = require('../db/knexfile');

const knex = require('knex')(knexfile['development'])
//process.env.NODE_ENV
module.exports = knex;