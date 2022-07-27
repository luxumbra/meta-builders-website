import type { Dispatch, SetStateAction} from "react";
import { useEffect, StrictMode, useCallback, useRef, useState } from "react";


import { useAddress } from "@thirdweb-dev/react"
import type { Marketplace } from "@thirdweb-dev/sdk";
import accounting from "accounting";
import gsap from "gsap";
import { FaSpinner } from "react-icons/fa/index.js";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import LoadingOrError from "../LoadingOrError";

import { ButtonWeb3Connect } from "./ButtonWeb3Connect";

import { shortenAddress } from "~mb/lib/helpers";


export type BuyPackOptions = {
  name: string;
  currencySymbol: string;
  listingId: string;
  quantityToBuy: number;
  currency: string;
  contract: string;
  price: string;
  marketplace: Marketplace;
}

export type ButtonBuyPackagePopUp = {
  pack: BuyPackOptions;
  forAddress: string | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function BuyPackackagePopUp(properties: ButtonBuyPackagePopUp): JSX.Element {
  const popUpReference = useRef<HTMLDivElement>(null);
  const contentReference = useRef<HTMLDivElement>(null);
  const overlayBg1Reference = useRef<HTMLDivElement>(null);
  const { forAddress, pack, isOpen, setIsOpen } = properties
  const { marketplace, name, price, currencySymbol, listingId } = pack
  const [isLoading, setIsLoading] = useState(false);
  const tl = gsap.timeline({paused: true, reversed: true});

  const popupTween = gsap.to(popUpReference.current, {
    opacity: 1,
    y: 0,
    delay: 0.1,
    duration: 0.5,
    ease: 'power2.out',
    autoAlpha: 1,
  })
  const progress = tl.progress();

    /** function to call the `buyNow` method of `useBuyNow` with a useCallback hook */
    const onBuyPackage = useCallback((id: string) => {
      setIsLoading(true);
      marketplace.buyoutListing(id, 1).then((data) => {
        console.log('buyPackage', { data });
        // Toast.success("Package purchased!");
        setIsLoading(false);
      }).catch((error: any) => {
        console.log('buyPackage error', { error });
        setIsLoading(false);
        // Toast.error(error.message);
      });
    }, [marketplace]);

  const onOpenBuyCallback = useCallback((open: boolean) => {
    gsap.set(popUpReference.current, { yPercent: 100, opacity: 0 });
    gsap.set(contentReference.current, { opacity: 0, scale: 0.8 });
    gsap.set(overlayBg1Reference.current, { opacity: 0, yPercent: -100, xPercent: -100 });

    // const tl = gsap.timeline({ paused: true });
    tl.to(popUpReference.current,
      {
        opacity: 1,
        yPercent: 0,
        delay: 0.1,
        duration: 0.3,
        ease: 'power2.inOut',
        autoAlpha: 0,
      }
    )
      .to(contentReference.current,
        {
          opacity: 1,
          scale: 1,
          delay: 0.05,
          duration: 0.7,
          ease: 'bounce.out',
        }
      )
      .to(overlayBg1Reference.current,
        {
          opacity: 1,
        }
      )
      if (open) {
        tl.play();
      } else {
        tl.reverse();
      }
    // switch (open) {
    //   case true:
    //     tl.play();
    //     console.log('open true', open, tl);
    //     break;

    //   case false:
    //     // setTimeout(() => { setIsOpen(false) }, 700)
    //     console.log('open false', open, tl);
    //     break;

    //   default:
    //     tl.reversed() tl.reverse();
    //     console.log('default', open, tl);
    //     break;
    // }
  }, [tl]);



  useEffect(() => {
    console.log('BuyPackackagePopUp efect', { isOpen });

    onOpenBuyCallback(isOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // useEventListener('click', (e: Event) => {
  //   const element = e.target as HTMLElement;
  //   const {current} = popUpReference;
  //   const currentContains = current?.contains(element)
  //   if (current !== null && !currentContains) {
  //       onOpenBuyCallback(false);
  //   }
  // });

  useOnClickOutside(popUpReference, () => onOpenBuyCallback(false));

  return (
    <div ref={popUpReference} className="buy-popup fixed w-full h-full l-0 r-0 b-0 inset-0 items-center origin-top justify-center p-3 overflow-hidden shadow-lg-inset shadow-violet-400">
      <div ref={contentReference} className="relative flex flex-col items-center justify-center z-10">
        <div className="flex-grow">
          <h3 className="text-purple-400 font-bold">Pack {`#${listingId}`}</h3>
          <p>{name}</p>
          <p>{accounting.formatMoney(price, '$', 2)} {currencySymbol}</p>
          {forAddress ? <p className="mb-3 text-sm">Active wallet {shortenAddress(forAddress)}</p> : undefined}
        </div>
        <div className="flex-shrink z-10">
        {forAddress ? (
            Number.parseFloat(price) > 0 ? (
                <button
                  type="button"
                  className="btn btn-primary flex-grow transition-all duration-200 ease-in-out text-center overflow-hidden"
                  onClick={():void => onBuyPackage(listingId)}
              >
                {!isLoading ? 'Buy now' : <LoadingOrError isInline  />}</button>
              ) : (
                <span>Contact us</span>
              )
          ) : (
            <div className="">
              <span className="text-sm text-purple-400">Connect to buy</span>
              <ButtonWeb3Connect size="3xl" />
            </div>
          )}
        </div>
      </div>
      <div ref={overlayBg1Reference} className="absolute  inset-0 w-[200%] h-[200%] origin-center ">
        <span className="text-purple-500 text-6xl">{name}</span>
      </div>
      <div className="bg-slate-800 absolute inset-px items-center origin-top justify-center z-0" />
    </div>
  )
}

export interface IButtonBuyPackage {
  pack: BuyPackOptions;
}

export function ButtonBuyPackage(properties: IButtonBuyPackage): JSX.Element {
  const { pack } = properties;

  // const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const reference = useRef<HTMLButtonElement>(null);
  const address = useAddress();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggleOpen = (): void => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        ref={reference}
        type="button"
        aria-label="Buy Package"
        className="btn bg-slate-800 text-violet-400 flex-grow transition-all duration-200 ease-in-out"
        data-package={pack.listingId}
        onClick={onToggleOpen}
      >
        Buy Package
      </button>

      <BuyPackackagePopUp pack={pack} forAddress={address} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
export default ButtonBuyPackage;