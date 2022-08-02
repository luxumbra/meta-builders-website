import { useCallback, useEffect, useState } from "react";

import { useMarketplace, useNetwork } from "@thirdweb-dev/react";
import type { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import { v4 as uuid } from "uuid";

import { PackageCard } from "../Cards";
import LoadingOrError from "../LoadingOrError";

import type { IPackage } from "~mb/types";


type MarketplaceProperties = {
  address: string;
}
export function MarketplaceListings({ address }: MarketplaceProperties): JSX.Element {
  const [marketplaceListings, setMarketplaceListings] = useState<AuctionListing[] | DirectListing[] | undefined>();
  const marketplace = useMarketplace(address);
  const [isLoading, setIsLoading] = useState(true);

  /** A callback function  to `getActiveListings` from the `marketplace` and then store them in `marketplaceListings` */
  const fetchListingsCallback = useCallback(async ():Promise<(AuctionListing | DirectListing)[] | undefined>  => {
    try {
      const listings = await marketplace?.getActiveListings();
      console.log('listings', listings);

      if (listings === undefined) {
        setIsLoading(false);
        throw new Error("Error fetching listings");
      }
      setIsLoading(false);
      listings.sort((a, b) => Number.parseFloat(a.buyoutCurrencyValuePerToken.displayValue) - Number.parseFloat(b.buyoutCurrencyValuePerToken.displayValue));
      return listings;
    } catch (error) {
      console.error("Error fetching listings", error);
      return undefined;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplace]);

  useEffect(() => {
    fetchListingsCallback().then(
      (listings) => {
        setMarketplaceListings(listings as AuctionListing[] | DirectListing[]);
      }
    ).catch(error => console.error(error));
  }, [fetchListingsCallback]);


  if (isLoading) {
    return <LoadingOrError isInline message="Loading NFTs..." />;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {(marketplaceListings && marketplaceListings.length > 0) ? (
        marketplaceListings.map((listing: AuctionListing | DirectListing) => {
          const {asset, id, assetContractAddress, buyoutCurrencyValuePerToken, currencyContractAddress} = listing;
          const cardKey = uuid();
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
            type: asset.type,
            attributes: asset.attributes,
            marketplace,
          } as IPackage

          return <PackageCard key={cardKey} pack={pack} />

        })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span>No listings</span>
          </div>
      )}
    </div>
  )
}

