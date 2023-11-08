import { useCallback, useEffect } from 'react'

import Honeybadger from '@honeybadger-io/js'
import { useActiveListings, useContract } from '@thirdweb-dev/react'
import type { AuctionListing, DirectListing } from '@thirdweb-dev/sdk'
import { v4 as uuid } from 'uuid'

import LoadingOrError from '../LoadingOrError'

import { PackageCard } from '~mb/cards/PackageCard'
import type { IPackage } from '~mb/types'

type MarketplaceProperties = {
  address: string
}
export function MarketplaceListings({
  address
}: MarketplaceProperties): JSX.Element {
  const { contract: marketplace } = useContract(address, 'marketplace')
  // const { data: metadata, isLoading: isMetadataLoading, error: metadataError } = useMetadata(marketplace);
  const {
    data: activeListings,
    isLoading: isActiveListingsLoading,
    error: activeListingsError
  } = useActiveListings(marketplace)
  console.log('validDirectListings', activeListings)

  /** A callback function  to `getActiveListings` from the `marketplace` and then store them in `marketplaceListings` */
  const fetchListingsCallback = useCallback(async (): Promise<
    (AuctionListing | DirectListing)[] | undefined
  > => {
    console.log('fetchListingsCallback', { address, marketplace })

    try {
      if (marketplace === undefined) throw new Error('Marketplace is undefined')
      if (activeListingsError) {
        const listingsError = activeListingsError as Error
        throw new Error(listingsError.message)
      }
      if (!activeListings) {
        throw new Error('Error fetching listings')
      }

      activeListings.sort(
        (
          a: AuctionListing | DirectListing,
          b: AuctionListing | DirectListing
        ) =>
          Number.parseFloat(a.buyoutCurrencyValuePerToken.displayValue) -
          Number.parseFloat(b.buyoutCurrencyValuePerToken.displayValue)
      )
      // listings.filter((listing) => listing.id >= '3')

      return activeListings
    } catch (error) {
      Honeybadger.notify(error as Error)
      // console.error("Error fetching listings", error);
      return undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplace])

  useEffect(() => {
    fetchListingsCallback()
      .then(listings => {
        console.log('listings', listings)
      })
      .catch(error => Honeybadger.notify(error as Error))
  }, [fetchListingsCallback])

  if (isActiveListingsLoading) {
    return <LoadingOrError isInline message='Loading packages...' />
  }
  return (
    <div className='flex flex-col items-stretch justify-items-stretch space-y-5 sm:grid sm:gap-4 sm:space-y-0 md:grid-cols-2 lg:grid-cols-3'>
      {activeListings && activeListings.length > 0 ? (
        activeListings.map((listing: AuctionListing | DirectListing) => {
          const {
            asset,
            id,
            assetContractAddress,
            buyoutCurrencyValuePerToken,
            currencyContractAddress
          } = listing
          console.log('asset', asset)

          const cardKey = uuid()
          const pack = {
            id,
            name: asset.name,
            description: asset.description,
            displayPrice: buyoutCurrencyValuePerToken.displayValue,
            value: buyoutCurrencyValuePerToken.value,
            address: assetContractAddress,
            currency: currencyContractAddress,
            currencySymbol: buyoutCurrencyValuePerToken.symbol,
            image: asset.image,
            animation_url: asset.animation_url,
            type: asset.type,
            attributes: asset.attributes,
            marketplace
          } as IPackage

          return <PackageCard key={cardKey} pack={pack} />
        })
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <p className='font-sans font-extrabold text-teal-500 text-3xl'>
            No listings
          </p>
        </div>
      )}
    </div>
  )
}
