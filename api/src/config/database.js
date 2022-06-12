const knexfile = require('../db/knexfile');
const config = require('./config');
const knex = require('knex')(knexfile[config.environment || 'development']);

module.exports = knex;
