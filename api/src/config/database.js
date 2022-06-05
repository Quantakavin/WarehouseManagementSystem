const knexfile = require('../db/knexfile');

const knex = require('knex')(knexfile[process.env.NODE_ENV])

module.exports = knex;

// const mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "isdnwmsdev",
//     password: ""
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });