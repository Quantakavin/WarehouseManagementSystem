const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbhost: process.env.DBHOST,
    dbname: process.env.DBNAME,
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD
}