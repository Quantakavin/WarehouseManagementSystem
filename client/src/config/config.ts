interface ConfigType {
  baseURL: string | undefined;
  serverURL: string | undefined;
}

const config: ConfigType = {
  baseURL: process.env.REACT_APP_BASE_URL,
  serverURL: process.env.REACT_APP_SERVER_URL,
};

export default config;
