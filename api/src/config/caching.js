const redis = require('redis');
//import { createClient } from 'redis';
let redisClient = null;

if(process.env.REDIS_URL){
    let redisURL = process.env.REDIS_URL;
    redisClient = redis.createClient(redisURL)
} else {
    redisClient = redis.createClient()
}
console.log("redisurl is ", process.env.REDIS_URL)
redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

module.exports = redisClient;
