const { Client } = require('@elastic/elasticsearch');
const config = require('./config');

const elasticClient = new Client({
    cloud: { id: config.elasticcloudid },
    auth: {
        username: config.elasticusername,
        password: config.elasticpassword
    }
});

module.exports = elasticClient;
