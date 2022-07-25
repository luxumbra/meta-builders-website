
import type { DirectListing, AuctionListing } from "@thirdweb-dev/sdk/dist/src/types/index";

import { ButtonBuyPackage } from "~mb/buttons/index";
import { PriceDisplay } from "~mb/components/PriceDisplay"

export interface IPack {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  type: string;
  isAuction: boolean;
  auction: AuctionListing | null;
  direct: DirectListing | null;
}

export function PackageCard(pack: IPack): JSX.Element {
  const { id, name, description, price, currency, image, type, isAuction, auction, direct } = pack;
  return (
    <div
      className="flex flex-col items-center justify-start h-full space-y-5 transition-all duration-300 group-hover:opacity-100 group-focus:opacity-100  border border-current p-5 leadIn bg-offset"
    >
      <div className="flex flex-col space-x-3 flex-grow w-full px-0">
        <h3 className="text-md font-extrabold text-center uppercase py-3">
          {name}
        </h3>
        <PriceDisplay price={price} currency={currency} />
        <p className="py-2 text-xs">{description}</p>
        {/* <ul>
      {includedServices.length > 0 && includedServices.map(({ name }) => (
      <li className="inline-flex items-center space-x-3">
        <Icon name="ic:baseline-check" className="text-green-600 text-sm w-5 h-5" />
        <span className="text-sm font-normal text-left capitalize">
          {name}
        </span>
      </li>
      ))}
    </ul> */}
      </div>
      <div className="items-center justify-center flex-shrink min-w-full w-full text-center">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary flex-grow"
          >Talk to us</button>
          <ButtonBuyPackage packageId={id} />
        </div>
      </div>
    </div>
  )
}