import type { Marketplace } from "@thirdweb-dev/sdk"

export const tokenId = 'ethereum'
export const coingeckoApiUrl = 'https://api.coingecko.com/api/v3/'
export const tokenQuery = '?localization=false&tickers=true&market_data=true'
export const packageContract = '0x3E7bD1a413D7f411C33A201A7e97b5680101a2e3'
export const marketPlaceContract = '0x98Cd691f8533359782B83BD3231348e39c553050'
export const officialUrl = import.meta.env.VITE_METABUILDERS_OFFICIAL_URL as string
export const imgixUrl = 'https://metabuilders.luxumbra.dev/'