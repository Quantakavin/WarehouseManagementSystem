const redis = require('redis');
// import { createClient } from 'redis';
let redisClient;

if (process.env.REDIS_URL) {
    const redisURL = process.env.REDIS_URL;
    redisClient = redis.createClient({ url: process.env.REDIS_URL });
} else {
    redisClient = redis.createClient();
}
redisClient.on('error', (err) =>
    console.log(`Redis Client Error ${err} and redis url is ${process.env.REDIS_URL}`)
);

redisClient.connect();

module.exports = redisClient;
