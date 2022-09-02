const config = require('./config');
// eslint-disable-next-line import/order
const twilioClient = require('twilio')(config.TwilioAccountSID, config.TwilioAuthToken);

module.exports = twilioClient;
