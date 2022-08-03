import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useCallback, useRef, useState } from 'react'

import { useAddress, useBalance, useMetamask, useNetwork, useNetworkMismatch, useToken } from '@thirdweb-dev/react'
import { ChainId, CurrencyValue, Marketplace, Token } from '@thirdweb-dev/sdk';
import { useMachine, normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import accounting from 'accounting'
import { BigNumber, utils } from 'ethers';
import gsap from 'gsap'
import { useOnClickOutside, useCopyToClipboard } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import LoadingOrError from '../LoadingOrError'

import { ButtonWeb3Connect } from './ButtonWeb3Connect'

import { Portal } from '~mb/components/Portal'
import Toast from '~mb/components/Toast'
import { shortenAddress } from '~mb/lib/helpers'
import { Icon } from '@iconify/react';
import { polygonScanApiEndpoint } from '~mb/lib/constants';
import PriceDisplay from '../PriceDisplay';
export type BuyPackOptions = {
  name: string
  currencySymbol: string
  listingId: string
  quantityToBuy: number
  currency: string
  contract: string
  price: string
  value: BigNumber
  marketplace: Marketplace
}

export type ButtonBuyPackagePopUp = {
  pack: BuyPackOptions
  forAddress: string | undefined
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface GetTokenBalanceResponse {
  balance: UserBalance
}
export type UserBalance = {
  displayValue: string
  value: BigNumber
}

export function BuyPackackagePopUp(
  properties: ButtonBuyPackagePopUp
): JSX.Element {
  const popUpReference = useRef<HTMLDivElement>(null)
  const contentReference = useRef<HTMLDivElement>(null)
  const overlayBg1Reference = useRef<HTMLDivElement>(null)
  const isNetworkMismatch = useNetworkMismatch()
  const [hasEnough, setHasEnough] = useState(false)
  const { forAddress, pack, isOpen, setIsOpen } = properties
  const { marketplace, name, price, currency, quantityToBuy, currencySymbol, listingId, value: packValue } = pack
  const [isLoading, setIsLoading] = useState(false)
  const network = useNetwork();
  const { chain } = network[0].data;
  // const { data: balance, isLoading: balanceLoading, error: balanceError } = useTokenBalance(currency, forAddress);
  const [copyValue, copy] = useCopyToClipboard()
  const [state, send] = useMachine(
    toast.group.machine({
      id: uuid(),
      pauseOnInteraction: true,
      pauseOnPageIdle: true,
      gutter: '1rem',
      offsets: {
        top: '2rem',
        right: '2rem',
        bottom: '2rem',
        left: '2rem'
      },
    })
  )
  const apiToast = toast.group.connect(state, send, normalizeProps)

  const popupTween = gsap.to(popUpReference.current, {
    opacity: 1,
    y: 0,
    delay: 0.1,
    duration: 0.5,
    ease: 'power2.out',
    autoAlpha: 1
  })



  async function getTokenBalance(contract: string, symbol: string,  address: string): Promise<UserBalance | undefined> {
    try {
      // for some reason matic in ThirdWeb uses 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE which isn't a contract address and it doesn't work with balanceOf so I'm getting balances from polygonscan.
      // const balance = symbol !== 'MATIC' ? await tokenData.balanceOf(address) : undefined
      const nativeToken = '0x0000000000000000000000000000000000001010'
      const tokenToCheck = symbol === 'MATIC' ? nativeToken : contract
      const balanceResponse = await fetch(
        `${polygonScanApiEndpoint}&module=account&action=tokenbalance&contractaddress=${tokenToCheck}&address=${address}`)
      const data = await balanceResponse.json()
      const balance = {
        displayValue: utils.formatUnits(data.result, chain?.nativeCurrency?.decimals),
        value: BigNumber.from(data.result)
      } as UserBalance

      return balance


    } catch (error) {
      console.log('Balance error', { error });
      return undefined
    }
  }

  function onCopy(toCopy: string): void {
    copy(toCopy).then(() => {

      const copyToastId = apiToast.upsert({
        id: uuid(),
        type: 'success',
        title: `Copied to clipboard: ${toCopy}`,
        placement: 'bottom-start',
        duration: 3000,
      })
    }).catch((_error: unknown) => {
      apiToast.create({
        type: 'error',
        title: `Failed to copy to clipboard: ${copyValue as string}`,
        duration: 3000
      })
    })
  }

  /** function to call the `buyNow` method of `useBuyNow`  */
  const onBuyPackage = useCallback(
    (id: string) => {
      // if (isNetworkMismatch) return
      // console.log('buying package', { id, forAddress });
      setIsLoading(true)

      if (forAddress) {
        const buyToastId = apiToast.create({
          id: uuid(),
          type: 'info',
          title: `Buying ${name} package for ${price} ${currencySymbol} - Please wait...`,
          description: 'Please sign the transaction in your wallet.',
          placement: 'bottom-end',
          duration: 7000
        })
        apiToast.pause()
        apiToast.create({
          id: uuid(),
          type: 'info',
          title: `Checking ${currencySymbol} balance...`,
          duration: 3000
        })

        getTokenBalance(currency, currencySymbol, forAddress).then(data => {
          if (data !== undefined) {
            const { value, displayValue } = data
            const enoughFunds = value.gte(packValue);
            if (enoughFunds) {
              setHasEnough(enoughFunds)
              apiToast.create({
                id: uuid(),
                type: 'success',
                title: `Balance confirmed: ${displayValue} ${currencySymbol}. `,
                duration: 3000
              })

              marketplace
                .buyoutListing(id, quantityToBuy)
                .then(data => {
                  apiToast.resume()
                  apiToast.create({
                    id: uuid(),
                    type: 'success',
                    title: `W00t! You bought ${name}! Your receipt: ${data.receipt.transactionHash}`,
                    description: `You have successfully bought ${name} for ${price} ${currencySymbol}. \n\n Your receipt: ${data.receipt.transactionHash}`,
                    duration: 7000
                  })

                  setIsLoading(false)
                })
                .catch((error: any) => {
                  console.log('buyPackage error', { error })
                  const errorMessage =
                    (error.message as string) || (error.toString() as string)
                  const errorToastId = apiToast.create({
                    id: uuid(),
                    type: 'error',
                    title: `Something went wrong!\n ${errorMessage}`,
                    duration: 7000
                  })
                  setIsLoading(false)
                }).finally(() => {
                  apiToast.resume()
                })
            } else {
              apiToast.resume()
              apiToast.create({
                id: uuid(),
                type: 'error',
                title: `You do not have sufficient ${currencySymbol} to buy this package`,
                duration: 3000
              })
              setHasEnough(enoughFunds)
              setIsLoading(false)
            }
          }

        }).catch((error: Error) => {
          console.error('tokenBalance error', error);
          apiToast.create({
            id: uuid(),
            type: 'error',
            title: `${error.message}`,
            duration: 3000
          })
          setIsLoading(false)
        });
      }

    },
    [forAddress, hasEnough, packValue, quantityToBuy, apiToast, currency, currencySymbol, isNetworkMismatch, marketplace, name, price]
  )

  const onOpenBuyCallback = useCallback((open: boolean) => {
    // gsap.set(popUpReference.current, { yPercent: 100, opacity: 0 });
    // gsap.set(contentReference.current, { opacity: 0, scale: 0.8 });
    // gsap.set(overlayBg1Reference.current, { opacity: 0, yPercent: -100, xPercent: -100 });

    const tl = gsap.timeline({ paused: true, reversed: true })
    gsap.set(popUpReference.current, { yPercent: 101, opacity: 0 })
    tl.to(
      popUpReference.current,
      {
        opacity: 1,
        display: 'flex',
        yPercent: 0,
        duration: 0.3,
        ease: 'power3',
      }
    )
      .to(contentReference.current, {
        opacity: 1,
        scale: 1,
        delay: 0.05,
        duration: 0.7
      })
      .to(overlayBg1Reference.current, {
        opacity: 1
      })
    if (tl.reversed()) {
      if (open) tl.play()
    } else {
      if (!open) tl.reverse()
      setTimeout(() => { console.log('close') }, 300)
    }
  }, [])

  useEffect(() => {
    onOpenBuyCallback(isOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onOpenBuyCallback])

  useOnClickOutside(popUpReference, () => setIsOpen(false))

  return (
    <>
      <div
        ref={popUpReference}
        className='buy-popup l-0 r-0 b-0 hidden fixed inset-0 h-full w-full origin-top items-center justify-center overflow-hidden border-2 border-violet-300 p-5 shadow-violet-400 z-30 text-slate-50'
      >
        <div
          ref={contentReference}
          className='relative flex flex-col items-center justify-center text-left z-[100]'
        >
          <div className='flex-grow'>
            <h3 className='text-teal-400 uppercase font-bold text-md text-left inline-flex flex-wrap flex-col space-0 gap-0 mb-3'>
              <span className='badge badge-outline text-xs leading-3 uppercase text-violet-400 font-normal'>Edition {`#${listingId}`}</span>
              <strong className='text-lg leading-3'>{name}</strong>
            </h3>
            <p>Let&apos;s do this! Hit &apos;Confirm&apos; below to buy this NFT, and the <span className='gradient-text font-bold'>Meta-Builders</span> services locked up inside it.</p>
            <div className='flex flex-col items-start justify-center space-y-2 my-3'>
              <p className='inline-flex flex-col gap-0 space-0'>
                <span className='text-sm'>Price:</span> <PriceDisplay price={price} currency={currencySymbol} />
              </p>
              {forAddress ? (
                <p className='mb-3 text-sm'>
                    <span className='text-md'>Active wallet</span>
                  <span className='tooltip tooltip-primary' data-tip='Click to copy'>
                    <span className='text-violet-400 ml-3'
                      tabIndex={0}
                      role="button"
                      onClick={(): void => onCopy(forAddress)}
                      onKeyPress={(): void => onCopy(forAddress)}
                    >{shortenAddress(forAddress)}</span>
                  </span>
                </p>
              ) : undefined}
            </div>
          </div>
          <div className='z-10 flex-shrink text-center'>
            {forAddress ? (
              Number.parseFloat(price) > 0 ? (
                <>
                  <span className={`text-md text-orange-500 ${isNetworkMismatch ? 'block' : 'hidden'}`}>Switch to <strong>Polygon Mumbai</strong>.</span>
                  <button
                    type='button'
                    className='btn btn-primary disabled:btn-disabled disabled:overflow-visible disabled:bg-transparent flex-grow overflow-hidden text-center transition-all duration-200 ease-in-out'
                    onClick={(): void => onBuyPackage(listingId)}
                    disabled={isLoading || isNetworkMismatch}
                    aria-disabled={isLoading}
                  >
                    {!isLoading ? 'Confirm' : <LoadingOrError isInline message="Transaction in progress..." />}
                  </button>
                </>
              ) : (
                <span>Contact us</span>
              )
            ) : (
              <div className=''>
                <span className='text-purple-400 text-sm'>Connect to buy</span>
                <ButtonWeb3Connect size='3xl' />
              </div>
            )}
          </div>
        </div>
        <div
          ref={overlayBg1Reference}
          className='absolute -inset-1/2 h-[200%] w-[200%] text-center origin-center z-30 flex items-center content-center justify-center'
        >
          <div className='text-violet-50 dark:text-teal-300 opacity-[5%] text-[10rem] text-center font-black leading-tight tracking-tighter uppercase font-sans transform -rotate-45'>{name}</div>
        </div>
        <div className='absolute inset-px z-10 origin-top items-center justify-center bg-violet-900 dark:bg-slate-800' />
      </div>

      <Portal>
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...apiToast.getGroupProps({ placement: 'bottom-end' })}
          className='pointer-events-none fixed inset-0 h-full w-full'
        >
          {apiToast.toasts.map(actor => (
            <Toast key={actor.id} actor={actor} id={actor.id} />
          ))}
        </div>

      </Portal>
    </>
  )
}

export interface IButtonBuyPackage {
  pack: BuyPackOptions
}

export function ButtonBuyPackage(properties: IButtonBuyPackage): JSX.Element {
  const { pack } = properties
  const connectMetamaskWallet = useMetamask()
  // const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const reference = useRef<HTMLButtonElement>(null)
  const address = useAddress()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function onConnectMetamask(): void {
    connectMetamaskWallet()
      .then(() => {
        console.log('connectMetamaskWallet', address)
      })
      .catch(error => {
        console.log('connectMetamaskWallet error', { error })
      })
  }

  const onToggleOpen = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        ref={reference}
        type='button'
        aria-label='Buy Package'
        className={`btn transition-colors ${!address
          ? 'bg-teal-700 text-violet-100'
          : 'bg-teal-400 text-slate-900'
          }  flex-grow transition-all duration-200 ease-in-out`}
        data-package={pack.listingId}
        onClick={!address ? onConnectMetamask : onToggleOpen}
      >
        <Icon icon="emojione-monotone:rocket" className="absolute text-teal-200 mr-2 h-20 w-20 opacity-10 -translate-x-8" />
        {!address ? 'Connect to buy' : 'Buy Package'}
      </button>

      <BuyPackackagePopUp
        pack={pack}
        forAddress={address}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}
export default ButtonBuyPackage
