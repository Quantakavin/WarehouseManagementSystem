const knexfile = require('../db/knexfile');
const config = require('./config');
// eslint-disable-next-line import/order
const knex = require('knex')(knexfile[config.environment || 'development']);

module.exports = knex;
