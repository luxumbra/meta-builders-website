export const tokenId = 'ethereum'
export const coingeckoApiUrl = 'https://api.coingecko.com/api/v3/'
export const tokenQuery = '?localization=false&tickers=true&market_data=true'
// export const marketPlaceContract = '0x98Cd691f8533359782B83BD3231348e39c553050' // mumbai
export const marketPlaceContract = '0x9d7Cb732BB73C75015c8eb4f0c7A148CA75336a1' // mainnet
export const officialUrl = import.meta.env.VITE_METABUILDERS_OFFICIAL_URL as string
export const isDevelopment = import.meta.env.DEV
export const imgixUrl = 'https://metabuilders.luxumbra.dev/'
export const polygonscanApiKey = import.meta.env.VITE_POLYGONSCAN_API_KEY as string
export const polygonScanApiEndpoint = `https://api-testnet.polygonscan.com/api?apikey=${polygonscanApiKey}&tag=latest`