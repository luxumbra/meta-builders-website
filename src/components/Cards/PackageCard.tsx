
import { Icon } from "@iconify/react";
import MuxVideo from "@mux/mux-video-react";
import { useMarketplace } from "@thirdweb-dev/react";
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

export interface IIncludedServices {
  services: PackageService[];
  consultingHours: PackageService[];
}
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const includedServices = (traits: IPackage['attributes']):
  IIncludedServices => {
  const services: PackageService[] = [];
  const consultingHours: PackageService[] = [];

  if (traits) {
    for (const element of traits) {
      console.log(element);

      if (element.trait_type.includes('Service')) {
        services.push(element as PackageService);
      }

      if (element.trait_type.includes('Consulting Hours')) {
        consultingHours.push(element as PackageService);
      }
    }
    console.log({ services, consultingHours });

    return {
      services,
      consultingHours
    };
  }
  return {
    services,
    consultingHours
  }
}


export function PackageCard(properties: PackageCardProperties): JSX.Element {
  const { pack } = properties;
  const { id, name, description, displayPrice, currency, currencySymbol, image, animation_url, attributes, value } = pack;
  const marketplace = useMarketplace(marketPlaceContract);
  const {services, consultingHours } = includedServices(attributes);
  // const attributeJson = JSON.parse(attributes);
  const qty = 1
  const buyPackInfo = {
    listingId: id,
    name,
    price: displayPrice,
    value,
    currency,
    currencySymbol,
    marketplace,
    quantityToBuy: qty,
    contract: marketPlaceContract,
  } as BuyPackOptions

  // console.log('buyPackInfo', buyPackInfo);

  return (
    <div
      className="package-card group relative flex flex-col flex-1 items-center justify-start h-full space-y-2 2xl:space-y-5 p-3 2xl:p-5 min-h-[400px]  overflow-hidden  z-10"
    >
      {animation_url ? (
        <MuxVideo
          className="absolute inset-0 w-full h-full z-0 grayscale dark:grayscale-0"
          src={animation_url}
          autoPlay
          loop
          muted
          streamType="on-demand"
        />
      ) : (
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
      )}
      <div className="absolute inset-0 bg-slate-800 opacity-[97%] border-violet-500 border-2 rounded-t-2xl rounded-b-md backdrop-blur-lg !mt-0 pt-0 z-0" />
      <div className="relative flex flex-col space-x-2 2xl:space-x-5 space-y-2 2xl:space-y-3 flex-grow w-full px-0 text-violet-50 mb-5 z-[1]">
        <h3 className="text-md xl:text-lg font-extrabold text-center uppercase text-violet-50">
          {name}
        </h3>
        <PriceDisplay price={displayPrice} currency={currencySymbol} />
        <p className="text-xs 4xl:text-sm leading-tight">{description}</p>
        <ul className="flex flex-col space-y-3">
          {consultingHours.length > 0 ? consultingHours.map(hours => (
              <li key={uuid()} className="flex items-center space-x-2 ">
              <Icon icon="lucide:calendar-clock" className="text-teal-400 text-xs 2xl:text-sm w-5 h-5" />
              <span className="text-violet-100 font-normal text-sm 3xl:text-base text-left uppercase">
              {hours.trait_type}:</span> <span className="text-violet-200 text-lg">{hours.value}</span>

              </li>
          )) : undefined}
          {services.length > 0 ? services.map(service => (
              <li key={uuid()} className="flex items-center space-x-2 space-y-0">
              <Icon icon="ic:baseline-check" className="text-teal-400 text-xs 2xl:text-sm w-5 h-5" />
              <span className="text-violet-100 font-normal text-left">
              {service.value}
              </span>
              </li>
            )) : undefined}
        </ul>
      </div>
      <div className="items-center justify-center flex-shrink min-w-full w-full text-center z-10">
        <div className="flex justify-between gap-3">
          <a
            href="https://discord.gg/MetaBuilders"
            target="_blank"
            rel="noopener noreferrer"
            className="relative btn bg-violet-700 text-white flex-grow transition-all duration-200 ease-in-out"
          ><Icon icon="line-md:discord" className="absolute mr-2 h-20 w-20 opacity-10 -rotate-45 -translate-x-6 z-0" />Talk to us</a>
          <ButtonBuyPackage pack={buyPackInfo} />
        </div>
      </div>
    </div>
  )
}