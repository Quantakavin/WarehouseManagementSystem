const config = require('./config')

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : config.dbhost,
      port : 3307,
      user : config.dbuser,
      password : config.dbpassword,
      database : config.dbname
    },
    pool: { min: 0, max: 10 }
});

module.exports = knex;