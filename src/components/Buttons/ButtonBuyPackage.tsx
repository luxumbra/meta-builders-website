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
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

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

  const toastId = uuid()
  const [state, send] = useMachine(
    toast.group.machine({
      pauseOnInteraction: true,
      pauseOnPageIdle: true,
      gutter: '1rem',
      offsets: {
        top: '2rem',
        right: '2rem',
        bottom: '2rem',
        left: '2rem'
      },
      id: toastId
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

  /** function to call the `buyNow` method of `useBuyNow` with a useCallback hook */
  const onBuyPackage = useCallback(
    (id: string) => {
      setIsLoading(true)
      apiToast.upsert({
        id: toastId,
        type: 'loading',
        title: 'Buy package.',
        description: 'Please sign the transaction in your wallet.',
        placement: 'bottom-end',
      })
      marketplace
        .buyoutListing(id, 1)
        .then(data => {
          console.log('buyPackage', { data })
          apiToast.upsert({
            id: toastId,
            type: 'loading',
              title: 'W00t! You bought the package!',
              description: `You have successfully bought ${name} for ${currencySymbol}${price}. \n\n Your receipt: ${data.receipt.transactionHash}`,
              duration: 7000
            })

          setIsLoading(false)
        })
        .catch((error: any) => {
          console.log('buyPackage error', { error })
          const errorMessage =
            (error.message as string) || (error.toString() as string)
          setIsLoading(false)
          apiToast.upsert({
            id: toastId,
            type: 'error',
            title: `Something went wrong!\n\n ${errorMessage}`,
            duration: 7000
          })

        }).finally(() => {
          setTimeout(() => {
            apiToast.dismiss()
          }, 7000)
          setIsLoading(false)
          // setTimeout(() => { apiToast.dismiss() }, 5000)
        })
    },
    [apiToast, currencySymbol, marketplace, name, price, toastId]
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
        yPercent: 0,
        duration: 0.3,
        ease: 'power2.out'
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
    console.log('BuyPackackagePopUp efect', { isOpen })

    onOpenBuyCallback(isOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onOpenBuyCallback])

  useOnClickOutside(popUpReference, () => setIsOpen(false))

  return (
    <>
      <div
        ref={popUpReference}
        className='buy-popup l-0 r-0 b-0 fixed inset-0 h-full w-full origin-top items-center justify-center overflow-hidden border-2 border-violet-300 p-3 shadow-violet-400'
      >
        <div
          ref={contentReference}
          className='relative z-10 flex flex-col items-center justify-center'
        >
          <div className='flex-grow'>
            <h3 className='font-bold text-purple-400'>
              Pack {`#${listingId}`}
            </h3>
            <p>{name}</p>
            <p>
              {accounting.formatMoney(price, '$', 2)} {currencySymbol}
            </p>
            {forAddress ? (
              <p className='mb-3 text-sm'>
                Active wallet {shortenAddress(forAddress)}
              </p>
            ) : undefined}
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
                  {!isLoading ? 'Buy now' : <LoadingOrError isInline message="Transaction in progress..." />}
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
          className='absolute  inset-0 h-[200%] w-[200%] origin-center '
        >
          <span className='text-purple-500 text-6xl'>{name}</span>
        </div>
        <div className='absolute inset-px z-0 origin-top items-center justify-center bg-slate-800' />
      </div>

      <Portal>
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...apiToast.getGroupProps({ placement: 'bottom-end' })}
          className='pointer-events-none fixed inset-0 h-full w-full'
        >
          {apiToast.toasts.map(actor => (
            <Toast key={actor.id} actor={actor} />
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
        className={`btn transition-colors ${
          !address
            ? 'bg-slate-800 text-violet-400'
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
