
import { useMarketplace } from "@thirdweb-dev/react";

import { ButtonBuyPackage } from "~mb/buttons/index";
import { PriceDisplay } from "~mb/components/PriceDisplay"
import { marketPlaceContract } from "~mb/lib/constants";
import type { IPackage } from "~mb/types";

export interface PackageCardProperties {
  pack: IPackage;
}

export function PackageCard(properties: PackageCardProperties): JSX.Element {
  const {pack} = properties;
  const { id, name, description, displayPrice, currency, currencySymbol, image, type, attributes } = pack;
  console.log('attributes', attributes);
  const marketplace = useMarketplace(marketPlaceContract);


  return (
    <div
      className="package-card relative flex flex-col items-center justify-start h-full space-y-5 transition-colors duration-300 group-hover:opacity-100 group-focus:opacity-100 p-5 leadIn overflow-hidden border-t-8 border-none border-violet-500"
    >
      <div className="flex flex-col space-x-3 flex-grow w-full px-0">
        <h3 className="text-lg font-extrabold text-center uppercase py-3">
          {name}
        </h3>
        <PriceDisplay price={displayPrice} currency={currencySymbol} />
        <p className="py-2 text-xs">{description}</p>
        <ul>
      {/* {attributes?.length > 0 && attributes.map(attr => (
      <li className="inline-flex items-center space-x-3">
        <Icon name="ic:baseline-check" className="text-green-600 text-sm w-5 h-5" />
        <span className="text-sm font-normal text-left capitalize">
          {attr.}
        </span>
      </li>
      ))} */}
    </ul>
      </div>
      <div className="items-center justify-center flex-shrink min-w-full w-full text-center">
    <div className="flex justify-between gap-3">
      <button
            type="button"

        className="btn bg-violet-700 text-violet-200 flex-grow transition-all duration-200 ease-in-out"
      >Talk to us</button>
      <ButtonBuyPackage
            packageId={id}
            marketplace={marketplace}
        />
    </div>
  </div>
    </div>
  )
}