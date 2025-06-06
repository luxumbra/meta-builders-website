/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useCallback, useRef, useState } from 'react'

import Honeybadger from '@honeybadger-io/js'
import { Icon } from '@iconify/react'
import {
  useAddress,
  useChain,
  useMetamask,
  useNetwork,
  useNetworkMismatch
} from '@thirdweb-dev/react'
import type { Marketplace } from '@thirdweb-dev/sdk'
import { useMachine, normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import type { BigNumberish } from 'ethers'
import { BigNumber, utils } from 'ethers'
import gsap from 'gsap'
import { useOnClickOutside, useCopyToClipboard } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import LoadingOrError from '../LoadingOrError'
import { PriceDisplay } from '../PriceDisplay'

import { ButtonWeb3Connect } from './ButtonWeb3Connect'

import { Portal } from '~mb/components/Portal'
import Toast from '~mb/components/Toast'
import { etherscanApiEndpoint } from '~mb/lib/constants'
import { shortenAddress } from '~mb/lib/helpers'

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
  const { forAddress, pack, isOpen, setIsOpen } = properties
  const {
    marketplace,
    name,
    price,
    currency,
    quantityToBuy,
    currencySymbol,
    listingId,
    value: packValue
  } = pack
  const [isLoading, setIsLoading] = useState(false)
  const chain = useChain()
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
      }
    })
  )
  const apiToast = toast.group.connect(state, send, normalizeProps)

  async function getTokenBalance(
    contract: string,
    symbol: string,
    address: string
  ): Promise<UserBalance | undefined> {
    try {
      // for some reason matic in ThirdWeb uses 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE which isn't a contract address and it doesn't work with balanceOf so I'm getting balances from polygonscan.
      // const balance = symbol !== 'MATIC' ? await tokenData.balanceOf(address) : undefined
      const nativeToken = '0xD76b5c2A23ef78368d8E34288B5b65D616B746aE'
      const tokenToCheck = symbol === 'ETH' ? nativeToken : contract
      const balanceResponse = await fetch(
        `${etherscanApiEndpoint}&module=account&action=tokenbalance&contractaddress=${tokenToCheck}&address=${address}`
      )
      const data = await balanceResponse.json()
      const balance = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        displayValue: utils.formatUnits(
          data.result as BigNumberish,
          chain?.nativeCurrency.decimals
        ),
        value: BigNumber.from(data.result)
      } as UserBalance

      return balance
    } catch (error) {
      Honeybadger.notify(error as Error)
      return undefined
    }
  }

  function onCopy(toCopy: string): void {
    copy(toCopy)
      .then(() => {
        const copyToastId = apiToast.upsert({
          id: uuid(),
          type: 'success',
          title: 'Copied to clipboard',
          description: toCopy,
          placement: 'bottom-start',
          duration: 3000
        })
      })
      .catch((_error: unknown) => {
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
      setIsLoading(true)

      if (forAddress) {
        const buyToastId = apiToast.create({
          id: uuid(),
          type: 'info',
          title: 'Buying Services',
          description: `${name}, ${price} ${currencySymbol}. Please sign the transaction in your wallet.`,
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

        getTokenBalance(currency, currencySymbol, forAddress)
          .then(data => {
            if (data !== undefined) {
              const { value, displayValue } = data
              const enoughFunds = value.gte(packValue)

              if (enoughFunds) {
                apiToast.create({
                  id: uuid(),
                  type: 'success',
                  title: `Balance confirmed: ${displayValue} ${currencySymbol}. `,
                  duration: 3000
                })

                marketplace
                  .buyoutListing(id, quantityToBuy)
                  .then(tx => {
                    apiToast.resume()
                    apiToast.create({
                      id: uuid(),
                      type: 'success',
                      title: `W00t! You bought ${name}!`,
                      description: `You have successfully bought ${name} for ${price} ${currencySymbol}. Your receipt: ${tx.receipt.transactionHash}`,
                      duration: 7000
                    })

                    setIsLoading(false)
                  })
                  .catch((error: Error) => {
                    Honeybadger.notify(error)
                    const errorMessage = error.message
                    const errorToastId = apiToast.create({
                      id: uuid(),
                      type: 'error',
                      title: 'Something went wrong!\n',
                      description: `${errorMessage}`,
                      duration: 7000
                    })
                    setIsLoading(false)
                  })
                  .finally(() => {
                    apiToast.resume()
                  })
              } else {
                apiToast.resume()
                apiToast.create({
                  id: uuid(),
                  type: 'error',
                  title: `Not enough funds`,
                  description: `You need at least ${price} ${currencySymbol} to buy ${name}. You have ${displayValue} ${currencySymbol}.`,
                  duration: 3000
                })
                setIsLoading(false)
              }
            }
            setIsLoading(false)
          })
          .catch((error: Error) => {
            console.error('tokenBalance error', error)
            apiToast.create({
              id: uuid(),
              type: 'error',
              title: `${error.message}`,
              duration: 3000
            })
            setIsLoading(false)
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      forAddress,
      packValue,
      quantityToBuy,
      apiToast,
      currency,
      currencySymbol,
      marketplace,
      name,
      price
    ]
  )

  const onOpenBuyCallback = useCallback((open: boolean) => {
    // gsap.set(popUpReference.current, { yPercent: 100, opacity: 0 });
    // gsap.set(contentReference.current, { opacity: 0, scale: 0.8 });
    // gsap.set(overlayBg1Reference.current, { opacity: 0, yPercent: -100, xPercent: -100 });
    if (popUpReference.current) {
      const tl = gsap.timeline({ paused: true, reversed: true })
      gsap.set(popUpReference.current, { yPercent: 101, opacity: 0 })
      tl.to(popUpReference.current, {
        opacity: 1,
        display: 'flex',
        yPercent: 0,
        duration: 0.3,
        ease: 'power3'
      })
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
        setTimeout(() => {}, 300)
      }
    }
  }, [])

  useEffect(() => {
    onOpenBuyCallback(isOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onOpenBuyCallback])

  useOnClickOutside(popUpReference, () => !isLoading && setIsOpen(false))

  return (
    <>
      <div
        ref={popUpReference}
        className='buy-popup l-0 r-0 b-0 fixed inset-0 z-30 hidden h-full w-full origin-top items-center justify-center overflow-hidden border-2 border-violet-300 p-5 text-slate-50 shadow-violet-400'
      >
        <div
          ref={contentReference}
          className='relative z-[100] flex flex-col items-center justify-center text-left'
        >
          <div className='flex-grow'>
            <h3 className='space-0 mb-1 inline-flex  flex-col flex-wrap gap-0 text-left font-bold uppercase text-teal-400 2xl:mb-3'>
              <span className='badge badge-outline text-xxs font-normal uppercase leading-3 text-violet-400 2xl:text-xs'>
                Edition {`#${listingId}`}
              </span>
              <strong className='leading-3 text-base 2xl:text-lg'>
                {name}
              </strong>
            </h3>
            <p className='text-xs 3xl:text-sm'>
              Let&apos;s do this! Hit &apos;Confirm&apos; below to buy this NFT
              chest and the{' '}
              <span className='gradient-text font-bold'>Meta-Builders</span>{' '}
              services locked up inside it.
            </p>
            <div className='my-3 flex flex-col items-start justify-center space-y-2'>
              <p className='space-0 inline-flex flex-col gap-0'>
                <span className='text-xs 2xl:text-sm'>Price:</span>{' '}
                <PriceDisplay price={price} currency={currencySymbol} />
              </p>
              {forAddress ? (
                <p className='mb-3 text-xs 2xl:text-sm'>
                  <span>Active wallet</span>
                  <span
                    className='tooltip tooltip-primary'
                    data-tip='Click to copy'
                  >
                    <span
                      className='ml-3 text-violet-400'
                      tabIndex={0}
                      role='button'
                      onClick={(): void => onCopy(forAddress)}
                      onKeyPress={(): void => onCopy(forAddress)}
                    >
                      {shortenAddress(forAddress)}
                    </span>
                  </span>
                </p>
              ) : undefined}
            </div>
          </div>
          <div className='z-10 flex-shrink text-center'>
            {forAddress ? (
              Number.parseFloat(price) > 0 ? (
                <>
                  <span
                    className={`text-md text-orange-500 ${
                      isNetworkMismatch ? 'block' : 'hidden'
                    }`}
                  >
                    Switch to{' '}
                    <strong className='text-inherit'>Ethereum mainnet</strong>.
                  </span>
                  <button
                    type='button'
                    className='btn btn-primary flex-grow overflow-hidden text-center transition-all duration-200 ease-in-out disabled:btn-disabled disabled:overflow-visible disabled:bg-transparent'
                    onClick={(): void => onBuyPackage(listingId)}
                    disabled={isLoading || isNetworkMismatch}
                    aria-disabled={isLoading}
                  >
                    {!isLoading ? (
                      'Confirm'
                    ) : (
                      <LoadingOrError
                        isInline
                        message='Transaction in progress...'
                      />
                    )}
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
          className='absolute -inset-1/2 z-30 flex h-[200%] w-[200%] origin-center content-center items-center justify-center text-center'
        >
          <div className='-rotate-45 transform text-center font-sans text-[10rem] font-black uppercase leading-tight tracking-tighter text-violet-50 opacity-[5%] dark:text-teal-300'>
            {name}
          </div>
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
        // console.log('connectMetamaskWallet', address)
      })
      .catch(error => {
        Honeybadger.notify(error as Error)
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
        className={`btn transition-colors ${
          !address
            ? 'bg-teal-700 text-violet-100'
            : 'bg-teal-400 text-slate-900'
        }  flex-grow transition-all duration-200 ease-in-out`}
        data-package={pack.listingId}
        // eslint-disable-next-line react/jsx-handler-names
        onClick={!address ? onConnectMetamask : onToggleOpen}
      >
        <Icon
          icon='emojione-monotone:rocket'
          className='absolute mr-2 h-20 w-20 -translate-x-8 text-teal-200 opacity-10'
        />
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
