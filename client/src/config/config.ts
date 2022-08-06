interface config {
  baseURL: string | undefined;
  TwilioAccountSID: string | undefined;
  TwilioAuthToken: string | undefined;
}

const config: config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  TwilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  TwilioAuthToken: process.env.TWILIO_AUTH_TOKEN
};

export default config;
