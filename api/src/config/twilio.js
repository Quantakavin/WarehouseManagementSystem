const config = require('./config');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// eslint-disable-next-line import/order
const twilioClient = require('twilio')(config.TwilioAccountSID, config.TwilioAuthToken);

// twilioClient.verify.v2.services
//                 .create({friendlyName: 'ISDN Warehouse Login'})

module.exports = twilioClient;
