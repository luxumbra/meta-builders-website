import { useCallback, useEffect, useState } from "react";

import { useMarketplace, useActiveListings } from "@thirdweb-dev/react";
import type { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import { uuid } from "uuidv4";


type MarketplaceProperties = {
  address: string;
}
export function MarketplaceListings({ address }: MarketplaceProperties): JSX.Element {
  const [marketplaceListings, setMarketplaceListings] = useState<AuctionListing[] | DirectListing[]>([]);
  const marketplace = useMarketplace(address);
  // const {listings, isLoading, error}: UseQueryResult<AuctionListing[] | DirectListing[]> = useActiveListings(marketplace);
  async function fetchListings(): Promise<void> {
    const listings = await marketplace?.getActiveListings();
    if (listings) {
      console.log('listings', listings);
      // setMarketplaceListings(listings);
    }
  }



  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {marketplaceListings.length > 0 ? marketplaceListings.map(item => (
        <pre key={uuid()}>
          {JSON.stringify(item, undefined, 2)}
        </pre>
      )) : undefined}
    </div>
  )
}

