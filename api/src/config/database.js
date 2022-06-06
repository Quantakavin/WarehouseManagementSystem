// const knexfile = require('../db/knexfile');

// const knex = require('knex')(knexfile[process.env.NODE_ENV])

// module.exports = knex;

var mysql = require('mysql');

var pool = {
getConnection: function() {
    var conn = mysql.createConnection({
    user: "isdnwmsdev",
    host: "isdnwms.dscloud.me",
    database: "isdnwarehouse",
    password: "Leaptron!62889125",
    port: 3307,
    max: 10
});
return conn;
}
};

module.exports = pool