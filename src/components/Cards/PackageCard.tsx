import { useState } from 'react'

import { Icon } from '@iconify/react'
import MuxVideo from '@mux/mux-video-react'
import { useContract } from '@thirdweb-dev/react'
import Imgix from 'react-imgix'
import { v4 as uuid } from 'uuid'

import type { BuyPackOptions } from '~mb/buttons/index'
import { ButtonBuyPackage } from '~mb/buttons/index'
import { PriceDisplay } from '~mb/components/PriceDisplay'
import { marketPlaceContract } from '~mb/lib/constants'
import type { IPackage } from '~mb/types'

export interface PackageCardProperties {
  pack: IPackage
}
export interface PackTrait {
  value: string
  trait_type: string
}

export type PackageService = {
  value: number | string
  trait_type: string
}

export interface IIncludedServices {
  services: PackageService[]
  consultingHours: PackageService[]
}
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const includedServices = (
  traits: IPackage['attributes']
): IIncludedServices => {
  const services: PackageService[] = []
  const consultingHours: PackageService[] = []
  if (traits) {
    for (const element of traits) {
      if (element.trait_type.includes('Service')) {
        services.push(element as PackageService)
      }

      if (element.trait_type.includes('Consulting Hours')) {
        consultingHours.push(element as PackageService)
      }
    }

    return {
      services,
      consultingHours
    }
  }
  return {
    services,
    consultingHours
  }
}

export function PackageVideo({
  url,
  name,
  isOpen
}: {
  url: string
  name: string
  isOpen: boolean
}): JSX.Element {
  const animationId = uuid()

  return (
    <div
      className={`absolute ${
        isOpen
          ? 'z-50 translate-y-0 opacity-100'
          : '-z-10 translate-y-32 opacity-0'
      } package-video inset-0 !mt-0 flex h-full w-full flex-col items-center justify-center pt-0 transition-all duration-500`}
    >
      <MuxVideo
        className='absolute inset-0 z-0 mt-0 h-full w-full object-cover'
        controls
        src={url}
        autoPlay={isOpen}
        loop={false}
        muted
        streamType='on-demand'
        metadata={{
          video_id: animationId,
          video_title: name
        }}
      />
    </div>
  )
}

export function PackageCard(properties: PackageCardProperties): JSX.Element {
  const { pack } = properties
  const {
    id,
    name,
    description,
    displayPrice,
    currency,
    currencySymbol,
    image,
    animation_url: animationURL,
    attributes,
    value
  } = pack
  const { contract: marketplace } = useContract(
    marketPlaceContract,
    'marketplace'
  )
  const { services, consultingHours } = includedServices(attributes)
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
    contract: marketPlaceContract
  } as BuyPackOptions
  const [videoIsOpen, setVideoIsOpen] = useState(false)

  const onToggleVideo = (): void => {
    setVideoIsOpen(!videoIsOpen)
  }
  // console.log('buyPackInfo', {pack, buyPackInfo});

  return (
    <div className='package-card group relative z-10 flex h-full min-h-[400px] flex-1 flex-col items-center justify-start space-y-2 overflow-hidden p-3  2xl:space-y-5  2xl:p-5'>
      {image && image !== '' ? (
        <Imgix
          src={image}
          width={300}
          height={300}
          className='absolute top-0 left-0 z-0 h-full w-full object-cover'
          imgixParams={{
            fit: 'crop',
            crop: 'edges',
            auto: 'format',
            // "blend-mode": "burn",
            q: '100'
          }}
          htmlAttributes={{
            alt: name,
            loading: 'lazy'
          }}
        />
      ) : undefined}
      <div className='absolute inset-0 z-0 !mt-0 rounded-t-2xl rounded-b-md border-2 border-violet-500 bg-slate-800 pt-0 opacity-[90%] backdrop-blur-lg' />
      <div className='relative z-[1] mb-5 flex w-full flex-grow flex-col space-x-2 space-y-2 px-0 text-violet-50 2xl:space-x-5 2xl:space-y-3'>
        <h3 className='text-md text-center font-extrabold uppercase text-violet-50 xl:text-lg'>
          {name}
        </h3>
        <PriceDisplay price={displayPrice} currency={currencySymbol} />
        <p className='leading-tight text-xs 4xl:text-sm'>{description}</p>
        <ul className='flex flex-col space-y-1'>
          {consultingHours.length > 0
            ? consultingHours.map(hours => (
                <li
                  key={uuid()}
                  className='inline-flex items-center space-x-2 space-y-0'
                >
                  <Icon
                    icon='lucide:calendar-clock'
                    className='h-5 w-5 text-teal-400 text-xs 2xl:text-sm'
                  />
                  <span className='text-left font-normal uppercase text-violet-100 text-sm 3xl:text-sm'>
                    {hours.trait_type}:
                  </span>{' '}
                  <span className='text-violet-50 text-base'>
                    {hours.value}
                  </span>
                </li>
              ))
            : undefined}
          {services.length > 0
            ? services.map(service => (
                <li
                  key={uuid()}
                  className='inline-flex items-center space-x-2 space-y-0'
                >
                  <Icon
                    icon='ic:baseline-check'
                    className='h-5 w-5 text-teal-400 text-xs 2xl:text-sm'
                  />
                  <span className='text-left font-normal text-violet-100'>
                    {service.value}
                  </span>
                </li>
              ))
            : undefined}
        </ul>
      </div>
      <div className='z-10 w-full min-w-full flex-shrink items-center justify-center text-center'>
        <div className='flex justify-between gap-3'>
          <a
            href='https://discord.gg/MetaBuilders'
            target='_blank'
            rel='noopener noreferrer'
            className='btn relative flex-grow bg-violet-700 text-white transition-all duration-200 ease-in-out'
          >
            <Icon
              icon='line-md:discord'
              className='absolute z-0 mr-2 h-20 w-20 -translate-x-6 -rotate-45 opacity-10'
            />
            Talk to us
          </a>
          <ButtonBuyPackage pack={buyPackInfo} />
        </div>
      </div>
      {animationURL ? (
        <>
          <button
            type='button'
            aria-label='Toggle video'
            onClick={onToggleVideo}
            className='ribbon-button btn btn-ghost z-[100] flex w-auto items-center justify-center bg-transparent shadow-none hover:bg-transparent'
          >
            <div
              className='tooltip tooltip-left tooltip-primary font-normal normal-case'
              data-tip={`${videoIsOpen ? 'Close' : 'Open'} NFT viewer`}
            >
              <Icon
                icon='bx:movie-play'
                className={`${
                  videoIsOpen ? 'text-teal-600' : 'text-violet-600'
                } transition-colors duration-300 text-3xl`}
              />
            </div>
          </button>

          <PackageVideo url={animationURL} name={name} isOpen={videoIsOpen} />
        </>
      ) : undefined}
    </div>
  )
}
