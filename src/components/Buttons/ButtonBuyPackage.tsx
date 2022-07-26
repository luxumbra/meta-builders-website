import { StrictMode, useCallback, useRef } from "react";


import { useBuyNow, useMarketplace } from "@thirdweb-dev/react"
import { FaSpinner } from "react-icons/fa/index.js";

interface IButtonBuyPackage {
  packageId: string;
}

export function ButtonBuyPackage(properties: IButtonBuyPackage): JSX.Element {
  const { packageId } = properties;
  const marketplace = useMarketplace();
  const {
    mutate: buyNow,
    isLoading,
    error: buyNowError,
  } = useBuyNow(marketplace);
  // const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const reference = useRef<HTMLButtonElement>(null);

  /** function to call the `buyNow` method of `useBuyNow` with a useCallback hook */
  const onBuyPackage = useCallback((id: string) => {
    buyNow(packageId).then(() => {
      console.log('buyPackage', { id, isLoading, buyNowError });
      // Toast.success("Package purchased!");
    }).catch((error: any) => {
      console.log('buyPackage error', { id, isLoading, error, buyNowError });
      // Toast.error(error.message);
    });
  }, [buyNow, packageId, isLoading, buyNowError]);

  return (
    <StrictMode>
      <button
        ref={reference}
        type="button"
        aria-label="Buy Package"
        className="btn btn-primary flex-grow"
        data-package={packageId}
        aria-disabled={isLoading}
        onClick={():void =>onBuyPackage(packageId)}
      >
        {isLoading ? <FaSpinner className="text-lg" /> : 'Buy Package'}
      </button>
    </StrictMode>
  )
}
export default ButtonBuyPackage;