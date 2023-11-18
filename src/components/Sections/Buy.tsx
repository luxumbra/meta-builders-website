import { Icon } from '@iconify/react'

import { marketPlaceContract } from '~mb/lib/constants'
import { MarketplaceListings } from '~mb/marketplace/index'
import { ContentSection } from '~mb/sections/index'

export function SectionIntro(): JSX.Element {
  return (
    <>
      <p>
        <strong>🚧 We are upgrading our marketplace contracts 🚧</strong>
      </p>
      <p>Please check back soon.</p>
      <p className='mx-auto mt-8 max-w-3xl text-center font-normal text-lg'>
        If you want to discuss your project with us or find out more about or
        services, join our{' '}
        <a
          href='https://discord.gg/metabuilders'
          rel='nofollow'
          className='text-teal-500'
        >
          Discord
          <Icon
            icon='mdi:discord'
            className='ml-2 inline-block h-5 w-5 text-teal-500'
          />
        </a>
      </p>
    </>
  )
}

export default function BuySection(): JSX.Element {
  const sectionId = 'pricing'

  return (
    <ContentSection title='Pricing' id={sectionId} lead={<SectionIntro />}>
      <div className='max-w-full self-center justify-self-center text-center md:max-w-6xl'>
        {/* <MarketplaceListings address={marketPlaceContract}  /> */}
        {/* <div className='max-w-3xl text-center'>
          <p>
            🚧 We are currently upgrading our marketplace. Please check back
            soon.
          </p>
          <p>
            If you want to discuss your project or find out more about or
            services, hop into our{' '}
            <a href='https://discord.gg/metabuilders' rel='nofollow'>
              Discord
            </a>
          </p>
        </div> */}
      </div>
    </ContentSection>
  )
}
