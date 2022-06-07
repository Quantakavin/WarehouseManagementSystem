// Update with your config settings.
const config = require('../config/config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : config.dbhost,
      port : 3307,
      user : config.dbuser,
      password : config.dbpassword,
      database : config.dbname
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : config.dbhost,
      port : 3307,
      user : config.dbuser,
      password : config.dbpassword,
      database : config.dbname
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : config.dbhost,
      port : 3307,
      user : config.dbuser,
      password : config.dbpassword,
      database : config.dbname
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
