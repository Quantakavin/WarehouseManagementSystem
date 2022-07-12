interface config {
    baseURL: string | undefined
}

const config: config = {
    baseURL: process.env.REACT_APP_BASE_URL
}

export default config;