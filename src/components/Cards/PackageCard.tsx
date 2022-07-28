
import { useMarketplace } from "@thirdweb-dev/react";
import type { Json } from "@thirdweb-dev/sdk";
import Imgix from "react-imgix";

import type { BuyPackOptions } from "~mb/buttons/index";
import { ButtonBuyPackage } from "~mb/buttons/index";
import { PriceDisplay } from "~mb/components/PriceDisplay"
import { marketPlaceContract } from "~mb/lib/constants";
import type { IPackage } from "~mb/types";

export interface PackageCardProperties {
  pack: IPackage;
}
export interface PackTrait {
  value: string;
  trait_type: string;
}
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const includedServices = (traits: IPackage['attributes']):
  Record<string, Json> | Record<string, Json>[] | undefined => {

  if (traits) {
    console.log('traits', traits);
    /** create an array from the `traits` Json array */
    // const traitsArray = traits.map((trait: Json) => {
    //   return trait;
    // }
    // const includedServices = traits.filter(trait => trait.trait_type === 'service_0');
    // if (includedServices.length > 0) {
    //   return includedServices[0].value;
    // }
  }
  return undefined
}


export function PackageCard(properties: PackageCardProperties): JSX.Element {
  const { pack } = properties;
  const { id, name, description, displayPrice, currency, currencySymbol, image, type, attributes } = pack;
  const marketplace = useMarketplace(marketPlaceContract);
  const services = includedServices(attributes);

  console.log('services', services);


  const buyPackInfo = {
    listingId: id,
    name,
    price: displayPrice,
    currency,
    currencySymbol,
    marketplace,
    quantityToBuy: 1,
    contract: marketPlaceContract,
  } as BuyPackOptions

  return (
    <div
      className="package-card group relative flex flex-col items-center justify-start h-full space-y-5  duration-300 p-5 leadIn overflow-hidden"
    >
      <Imgix
        src={image}
        width={300}
        height={300}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        imgixParams={{
          fit: "crop",
          crop: "edges",
          auto: "format",
          "blend-mode": "burn",
          q: "80",
        }}
        htmlAttributes={{
          alt: name,
        }}
      />

      <div className="flex flex-col space-x-3 flex-grow w-full px-0 text-violet-50 z-10 backdrop-blur-lg ">
        <h3 className="text-lg font-extrabold text-center uppercase py-3 text-violet-50">
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
      <div className="items-center justify-center flex-shrink min-w-full w-full text-center z-10">
        <div className="flex justify-between gap-3">
          <button
            type="button"

            className="btn bg-violet-700 text-violet-200 flex-grow transition-all duration-200 ease-in-out"
          >Talk to us</button>
          <ButtonBuyPackage pack={buyPackInfo} />
        </div>
      </div>
    </div>
  )
}