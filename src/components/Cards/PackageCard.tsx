
import { Icon } from "@iconify/react";
import { useMarketplace } from "@thirdweb-dev/react";
import type { Json } from "@thirdweb-dev/sdk";
import Imgix from "react-imgix";
import { v4 as uuid } from "uuid";

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

export type PackageService = {
  value: number | string;
  trait_type: string;
}
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const includedServices = (traits: IPackage['attributes']):
  PackageService[] => {
    const services: PackageService[] = [];

  if (traits) {
    for (const element of traits) {
      if (element.trait_type.includes('service_')) {
        services.push(element as PackageService);
      }
    }

    return services;
  }
  return services
}


export function PackageCard(properties: PackageCardProperties): JSX.Element {
  const { pack } = properties;
  const { id, name, description, displayPrice, currency, currencySymbol, image, type, attributes } = pack;
  const marketplace = useMarketplace(marketPlaceContract);
  const services = includedServices(attributes);
  // const attributeJson = JSON.parse(attributes);

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
      className="package-card group relative flex flex-col items-center justify-start h-full space-y-2 md:space-y-5 p-2 md:p-5  overflow-hidden  z-10"
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
          loading: "lazy",
        }}
      />
      <div className="absolute inset-0 bg-slate-800 opacity-[97%] border-violet-500 border-2 rounded-t-2xl rounded-b-md backdrop-blur-lg !mt-0 pt-0 z-0" />
      <div className="relative flex flex-col space-x-2 2xl:space-x-5 space-y-2 2xl:space-y-3 flex-grow w-full px-0 text-violet-50 mb-5 z-[1]">
        <h3 className="text-md 2xl:text-lg font-extrabold text-center uppercase text-violet-50">
          {name}
        </h3>
        <PriceDisplay price={displayPrice} currency={currencySymbol} />
        <p className="text-sm leading-tight">{description}</p>
        <ul className="flex flex-col space-y-3">
          {services.length > 0 ? services.map(service => (
              <li key={uuid()} className="flex items-center space-x-3 ">
              <Icon icon="ic:baseline-check" className="text-teal-400 text-sm w-5 h-5" />
              <span className="text-md text-violet-100 font-normal text-left">
                {service.value}
              </span>
              </li>
            )) : undefined}
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