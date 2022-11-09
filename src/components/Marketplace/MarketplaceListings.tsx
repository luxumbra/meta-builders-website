import { useCallback, useEffect, useState } from "react";

import Honeybadger from "@honeybadger-io/js";
import { useMarketplace } from "@thirdweb-dev/react";
import type { AuctionListing, DirectListing, Marketplace } from "@thirdweb-dev/sdk";
import { v4 as uuid } from "uuid";

import { PackageCard } from "../Cards";
import LoadingOrError from "../LoadingOrError";

import type { IPackage } from "~mb/types";


type MarketplaceProperties = {
  address: string;
}
export function MarketplaceListings({ address }: MarketplaceProperties): JSX.Element {
  const [marketplaceListings, setMarketplaceListings] = useState<AuctionListing[] | DirectListing[] | undefined>();
  const marketplace: Marketplace | undefined = useMarketplace(address);
  const [isLoading, setIsLoading] = useState(true);

  /** A callback function  to `getActiveListings` from the `marketplace` and then store them in `marketplaceListings` */
  const fetchListingsCallback = useCallback(async ():Promise<(AuctionListing | DirectListing)[] | undefined>  => {
    try {
      if (marketplace === undefined) throw new Error('Marketplace is undefined');
      const listings: (AuctionListing | DirectListing)[] = await marketplace.getActiveListings();

      if (listings.length === 0) {
        setIsLoading(false);
        throw new Error("Error fetching listings");
      }
      setIsLoading(false);
      listings.sort((a: AuctionListing | DirectListing, b: AuctionListing | DirectListing) => Number.parseFloat(a.buyoutCurrencyValuePerToken.displayValue) - Number.parseFloat(b.buyoutCurrencyValuePerToken.displayValue));
      // listings.filter((listing) => listing.id >= '3')
      return listings;
    } catch (error) {
      Honeybadger.notify(error as Error);
      // console.error("Error fetching listings", error);
      return undefined;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplace]);

  useEffect(() => {
    fetchListingsCallback().then(
      (listings) => {
        setMarketplaceListings(listings as AuctionListing[] | DirectListing[]);
      }
    ).catch(error => Honeybadger.notify(error as Error));
  }, [fetchListingsCallback]);


  if (isLoading) {
    return <LoadingOrError isInline message="Loading packages..." />;
  }
  return (
    <div className="flex flex-col space-y-5 items-stretch justify-items-stretch sm:space-y-0 sm:grid sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {(marketplaceListings && marketplaceListings.length > 0) ? (
        marketplaceListings.map((listing: AuctionListing | DirectListing) => {
          const { asset, id, assetContractAddress, buyoutCurrencyValuePerToken, currencyContractAddress } = listing;
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
            animation_url: asset.animation_url,
            type: asset.type,
            attributes: asset.attributes,
            marketplace,
          } as IPackage

          return <PackageCard key={cardKey} pack={pack} />

        })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl text-teal-500 font-sans font-extrabold">No listings</p>
          </div>
      )}
    </div>
  )
}

