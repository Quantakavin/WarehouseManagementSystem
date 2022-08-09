interface config {
  baseURL: string | undefined;
  serverURL: string | undefined;
}

const config: config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  serverURL: process.env.REACT_APP_SERVER_URL
};

export default config;
