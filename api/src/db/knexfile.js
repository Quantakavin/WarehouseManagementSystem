// Update with your config settings.
// const config = require('../config/config')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
    development: {
        client: 'mysql',
        // debug: true,
        connection: {
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        },
        pool: {
            min: 0,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host: process.env.DBHOST,
            port: process.env.PORT,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
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
            host: process.env.DBHOST,
            port: process.env.PORT,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        },
        pool: {
            min: 0,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host: process.env.DBHOST,
            port: process.env.PORT,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
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
