export const tokenId = 'ethereum'
export const coingeckoApiUrl = 'https://api.coingecko.com/api/v3/'
export const tokenQuery = '?localization=false&tickers=true&market_data=true'
// export const marketPlaceContract = '0x98Cd691f8533359782B83BD3231348e39c553050' // mumbai
export const marketPlaceContract = '0x9d7Cb732BB73C75015c8eb4f0c7A148CA75336a1' // mainnet
export const officialUrl = import.meta.env.VITE_METABUILDERS_OFFICIAL_URL as string
export const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development'
export const imgixUrl = 'https://meta-builders.com/'
export const polygonscanApiKey = import.meta.env.VITE_POLYGONSCAN_API_KEY as string
export const polygonscanApiEndpoint = `https://api-testnet.polygonscan.com/api?apikey=${polygonscanApiKey}&tag=latest`
export const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY as string
export const etherscanApiEndpoint = `https://api.etherscan.io/api?apikey=${etherscanApiKey}&tag=latest`
export const userbackToken = import.meta.env.VITE_USERBACK_TOKEN as string
export const honeybadgerApiKey = import.meta.env.VITE_HONEYBADGER_API_KEY as string || 'hbp_0YKCJT3HO8S0WpuGbDRUfw5kxCiJVA1Xi178'
// export const sentryAuthToken = import.meta.env.VITE_SENTRY_AUTH_TOKEN as string