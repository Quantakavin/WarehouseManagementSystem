interface config {
    baseURL: string | undefined
}

const config: config = {
    baseURL: process.env.BASEURL
}

export default config;