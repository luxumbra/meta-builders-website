import { lazy, Suspense } from 'react'

import LoadingOrError from '~mb/components/LoadingOrError'
import Layout from '~mb/layouts/Default'
import { imgixUrl } from '~mb/lib/constants'
import '~mb/styles/index.css'

const BuySection = lazy(async () => import('~mb/sections/Buy'))
const IntroSection = lazy(async () => import('~mb/sections/Intro'))
const SplashSection = lazy(async () => import('~mb/sections/Splash'))
const PartnersSection = lazy(async () => import('~mb/sections/Partners'))
const TeamSection = lazy(async () => import('~mb/sections/Team'))
const ServicesSection = lazy(async () => import('~mb/sections/Services'))

const previewImgUrl = new URL('social.png', imgixUrl)
const meta = {
  title: 'Welcome to the Metaverse',
  description:
    'Welcome to the Metaverse. Our Services Help You Navigate this New Paradigm, and Take Your Brand to New Heights',
  permaLink: '',
  previewImageSrc: new URL('social.png', imgixUrl)
}

export function Home(): JSX.Element {
  return (
    <Layout content={meta}>
      <SplashSection />
      <IntroSection />
      <ServicesSection />
      <PartnersSection />
      <TeamSection />
      <BuySection />
    </Layout>
  )
}

export default Home
