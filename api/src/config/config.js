const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbhost: process.env.DBHOST,
    dbname: process.env.DBNAME,
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD,
    JWTKey: process.env.JWTKEY,
    environment: process.env.NODE_ENV,
    refreshtokensecret: process.env.REFRESH_TOKEN_SECRET,
    cookiesecret: process.env.COOKIE_SECRET,
    elasticusername: process.env.ELASTIC_USERNAME,
    elasticpassword: process.env.ELASTIC_PASSWORD,
    elasticcloudid: process.env.ELASTIC_CLOUD_ID,
    TwilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    TwilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    TwilioService: process.env.TWILIO_SERVICE,
    MQTTHost: process.env.MQTT_HOST,
    MQTTClient: process.env.MQTT_CLIENTID,
    MQTTPassword: process.env.MQTT_PASSWORD,
    MQTTUsername: process.env.MQTT_USERNAME
};
