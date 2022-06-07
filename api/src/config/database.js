// const knexfile = require('../db/knexfile');

// const knex = require('knex')(knexfile[process.env.NODE_ENV])

// module.exports = knex;

const knexfile = require('../db/knexfile');
const config = require('./config');

const knex = require('knex')(knexfile[config.environment|| 'development'])
module.exports = knex;