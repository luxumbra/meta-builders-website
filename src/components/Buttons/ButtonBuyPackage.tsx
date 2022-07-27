import { StrictMode, useCallback, useRef, useState } from "react";


import { useBuyNow, useMarketplace } from "@thirdweb-dev/react"
import type { Marketplace } from "@thirdweb-dev/sdk";
import { FaSpinner } from "react-icons/fa/index.js";


// export function BuyPackackagePopUp(props: ButtonBuyPackagePopUp) {
//   const { parseEther} = utils;
//   const { txReceipt, write } = useContract();
//   const popUpRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const overlayBg1Ref = useRef<HTMLDivElement>(null);
//   const { forAddress, pack, isOpen, setIsOpen } = props
//   const { networkData } = useNetwork();
//   const tl = gsap.timeline();

//   const popupTween = gsap.to(popUpRef.current, {
//     opacity: 1,
//     y: 0,
//     delay: 0.1,
//     duration: 0.5,
//     ease: 'power2.out',
//     autoAlpha: 1,
//   })
//   const progress = tl.progress();
//   const onOpenBuyCallback = useCallback((open: boolean) => {
//     if (typeof window === undefined) return;
//     const packageOverlays = document.querySelectorAll(".buy-popup");
//     gsap.set(popUpRef.current, { yPercent: 100, opacity: 0 });
//     gsap.set(contentRef.current, { opacity: 0, scale: 0.8 });
//     gsap.set(overlayBg1Ref.current, { opacity: 0, yPercent: -100, xPercent: -100 });
//     let tl = gsap.timeline({ paused: true });
//     tl.to(popUpRef.current,
//       {
//         opacity: 1,
//         yPercent: 0,
//         delay: 0.1,
//         duration: 0.3,
//         ease: 'power2.inOut',
//         autoAlpha: 1,
//       }
//     )
//       .to(contentRef.current,
//         {
//           opacity: 1,
//           scale: 1,
//           delay: 0.05,
//           duration: 0.7,
//           ease: 'bounce.out',
//         }
//       )
//       .to(overlayBg1Ref.current,
//         {
//           opacity: 1,
//         }
//       )

//     switch (open) {
//       case true:
//         tl.play();
//         setIsOpen(true);
//         console.log('open true', open, isOpen, tl);
//         break;

//       // case false:
//       //   // setTimeout(() => { setIsOpen(false) }, 700)
//       //   console.log('open false', open, isOpen, tl);
//       //   break;

//       default:
//         tl.reverse();
//         setIsOpen(false);
//         console.log('default', open, isOpen, tl);
//         break;
//     }
//   }, [tl]);


//   const dataToSend: WriteContractConfig = {
//     addressOrName: pack.contract,
//     args: {
//       _listingId: pack.listingId,
//       _buyFor: forAddress,
//       _quantityToBuy: pack.quantityToBuy,
//       _currency: pack.currency,
//       _totalPrice: parseEther(pack.totalPrice),
//     },
//     chainId: networkData.chain?.id,
//     contractInterface: MARKETPLACE_ABI,
//     functionName: "buy"
//   }

//   /** Buy package when button is clicked */
//   const onClickBuy = useCallback(async () => {
//     try {
//       if (dataToSend.args.buy === "TBC") return;
//       if (!forAddress) return;
//       console.log("buy package", dataToSend);

//       const tx = await write(dataToSend);
//       console.log('Buy package tx', tx);
//       if (tx) {
//         console.log('Buy package tx success', tx);
//       } else {
//         throw new Error("Transaction failed");
//       }
//     } catch (error) {
//       console.log('Buy package tx error', error);
//     }
//   }, [write, forAddress, pack, dataToSend]);


//   useEffect(() => {
//     onOpenBuyCallback(isOpen);
//   }, [onOpenBuyCallback]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       window.addEventListener('click', (e) => {
//         const el = e.target as HTMLElement;
//         const current = popUpRef.current;
//         const currContains = current?.contains(el)
//         if (popUpRef.current !== null) {
//           if (!popUpRef.current.contains(el)) {
//             onOpenBuyCallback(false);
//           }
//         }
//       }
//       );
//     }
//     return () => {
//       if (typeof window !== 'undefined') {
//         window.removeEventListener('click', (e) => { });
//       }
//     }
//   }, [popUpRef]);

//   return (
//     <div ref={popUpRef} className={`buy-popup fixed w-full h-full l-0 r-0 b-0 inset-0 items-center origin-top justify-center p-3 overflow-hidden shadow-lg-inset shadow-violet-400`}>
//       <div ref={contentRef} className="relative flex flex-col items-center justify-center z-10">
//         <div className="flex-grow">
//           <h3 className="text-purple-400 font-bold">Pack {`#${pack.listingId}`}</h3>
//           <p>{pack.name}</p>
//           <p>{accounting.formatMoney(pack.totalPrice, '$', 0)} {pack.currencySymbol}</p>
//           {forAddress && <p className="mb-3 text-sm">Active wallet {shortenAddress(forAddress)}</p>}
//         </div>
//         <div className="flex-shrink z-10">
//           {forAddress ? (
//             parseFloat(pack.totalPrice) > 0 ?
//               <button
//                 className="btn btn-primary flex-grow transition-all duration-200 ease-in-out"
//                 onClick={onClickBuy}
//               >Buy now</button> : <span>Contact us</span>
//           ) : (
//             <div className="">
//               <span className="text-sm text-purple-400">Connect to buy</span>
//               <ButtonWeb3Connect size="3xl" />
//             </div>
//           )}
//         </div>
//       </div>
//       <div ref={overlayBg1Ref} className="absolute  inset-0 w-[200%] h-[200%] origin-center ">
//         <span className="text-purple-500 text-6xl">{pack.name}</span>
//       </div>
//       <div className="bg-slate-800 absolute inset-px items-center origin-top justify-center z-0" />
//     </div>
//   )
// }

interface IButtonBuyPackage {
  packageId: string;
  marketplace: Marketplace | undefined;
}

export function ButtonBuyPackage(properties: IButtonBuyPackage): JSX.Element {
  const { packageId, marketplace } = properties;
  const [isLoading, setIsLoading] = useState(false);
  // const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const reference = useRef<HTMLButtonElement>(null);

  /** function to call the `buyNow` method of `useBuyNow` with a useCallback hook */
  const onBuyPackage = useCallback((id: string) => {
    setIsLoading(true);
    marketplace?.buyoutListing(id, 1).then((data) => {
      console.log('buyPackage', { data });
      // Toast.success("Package purchased!");
      setIsLoading(false);
    }).catch((error: any) => {
      console.log('buyPackage error', { error });
      setIsLoading(false);
      // Toast.error(error.message);
    });
  }, [marketplace]);

  return (
      <button
        ref={reference}
        type="button"
        aria-label="Buy Package"
        className="btn bg-slate-800 text-violet-400 flex-grow transition-all duration-200 ease-in-out"
        data-package={packageId}
        aria-disabled={isLoading}
        onClick={():void => onBuyPackage(packageId)}
      >
        {isLoading ? <FaSpinner className="text-lg" /> : 'Buy Package'}
      </button>
  )
}
export default ButtonBuyPackage;