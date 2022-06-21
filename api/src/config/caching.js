const redis = require('redis');
//import { createClient } from 'redis';
const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

module.exports = redisClient;
