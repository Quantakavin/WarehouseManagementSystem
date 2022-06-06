const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbhost: process.env.DBHOST,
    dbname: process.env.DBNAME,
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD
}

//DBHOST=isdnwms.dscloud.me
// DBUSER=isdnwmsdev
// DBPASSSWORD=Leaptron!62889125
// DBNAME=isdnwarehouse
// JWTKEY=A96C81F69CB9F16FCC4D9E7352CBFC65247184A5AEDEA707151E5E4B3F752308