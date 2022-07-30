import type { Dispatch, SetStateAction } from 'react'
import { useEffect, StrictMode, useCallback, useRef, useState } from 'react'

import { useAddress, useMetamask } from '@thirdweb-dev/react'
import type { Marketplace } from '@thirdweb-dev/sdk'
import { useMachine, normalizeProps } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import accounting from 'accounting'
import gsap from 'gsap'
import { FaSpinner } from 'react-icons/fa/index.js'
import { TbMacro } from 'react-icons/tb'
import { useEventListener, useOnClickOutside, useCopyToClipboard } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'
import { promise } from 'zod'

import LoadingOrError from '../LoadingOrError'

import { ButtonWeb3Connect } from './ButtonWeb3Connect'

import { Portal } from '~mb/components/Portal'
import Toast from '~mb/components/Toast'
import { shortenAddress } from '~mb/lib/helpers'

export type BuyPackOptions = {
  name: string
  currencySymbol: string
  listingId: string
  quantityToBuy: number
  currency: string
  contract: string
  price: string
  marketplace: Marketplace
}

export type ButtonBuyPackagePopUp = {
  pack: BuyPackOptions
  forAddress: string | undefined
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function BuyPackackagePopUp(
  properties: ButtonBuyPackagePopUp
): JSX.Element {
  const popUpReference = useRef<HTMLDivElement>(null)
  const contentReference = useRef<HTMLDivElement>(null)
  const overlayBg1Reference = useRef<HTMLDivElement>(null)
  const { forAddress, pack, isOpen, setIsOpen } = properties
  const { marketplace, name, price, currencySymbol, listingId } = pack
  const [isLoading, setIsLoading] = useState(false)
  const [value, copy] = useCopyToClipboard()
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
  function onCopy(toCopy: string): void {
    copy(toCopy).then(() => {
      console.log('copied', {toCopy, value});

      const copyToastId = apiToast.upsert({
        id: uuid(),
        type: 'success',
        title: `Copied to clipboard: ${toCopy}`,
      })
    }).catch((_error: unknown) => {
      apiToast.create({
        type: 'error',
        title: `Failed to copy to clipboard: ${value as string}`,
        duration: 3000
      })
    })
  }

  /** function to call the `buyNow` method of `useBuyNow` with a useCallback hook */
  const onBuyPackage = useCallback(
    (id: string) => {
      setIsLoading(true)
      const buyToastId = apiToast.create({
        id: uuid(),
        type: 'info',
        title: `Buying ${name}`,
        description: 'Please sign the transaction in your wallet.',
        placement: 'bottom-end',
      })
      apiToast.pause()
      marketplace
        .buyoutListing(id, 1)
        .then(data => {

          apiToast.create({
              id: uuid(),
              type: 'success',
              title: 'W00t! You bought the package!',
              description: `You have successfully bought ${name} for ${currencySymbol}${price}. \n\n Your receipt: ${data.receipt.transactionHash}`,
              duration: 7000
            })

          setIsLoading(false)
          // setTimeout(() => { apiToast.dismiss() }, 7000)
        })
        .catch((error: any) => {
          console.log('buyPackage error', { error })
          const errorMessage =
            (error.message as string) || (error.toString() as string)
          setIsLoading(false)
          // if (buyToastId !== undefined) {

          const errorToastId = apiToast.create({
            id: uuid(),
            type: 'error',
            title: `Something went wrong!\n ${errorMessage}`,
            duration: 7000
          })
          // }
        }).finally(() => {
          setIsLoading(false)
        })
    },
    [apiToast, currencySymbol, marketplace, name, price]
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
                <span className='text-sm'>Price:</span> <span className='text-xl'> {accounting.formatMoney(price, '$', 2)} <span className='text-violet-400'>{currencySymbol}</span></span>
              </p>
              {forAddress ? (
                <p className='mb-3 text-sm'>
                  <span className='text-md'>Active wallet</span>
                  <span className='text-violet-400 ml-3'
                    tabIndex={0}
                    role="button"
                    onClick={(): void => onCopy(forAddress)}
                    onKeyPress={(): void => onCopy(forAddress)}
                  >{shortenAddress(forAddress)}</span>
                </p>
              ) : undefined}
            </div>
          </div>
          <div className='z-10 flex-shrink'>
            {forAddress ? (
              Number.parseFloat(price) > 0 ? (
                <button
                  type='button'
                  className='btn btn-primary disabled:btn-disabled disabled:overflow-visible disabled:bg-transparent flex-grow overflow-hidden text-center transition-all duration-200 ease-in-out'
                  onClick={(): void => onBuyPackage(listingId)}
                  disabled={isLoading}
                  aria-disabled={isLoading}
                >
                  {!isLoading ? 'Confirm' : <LoadingOrError isInline message="Transaction in progress..." />}
                </button>
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
