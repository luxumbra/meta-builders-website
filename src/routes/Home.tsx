import { lazy, Suspense } from 'react'

import { useLocation } from 'react-router-dom'

import LoadingOrError from '~mb/components/LoadingOrError'
import Layout from '~mb/layouts/Default'
import { imgixUrl } from '~mb/lib/constants'

import '~mb/styles/index.css'

// const BuySection = lazy(async () => import('~mb/sections/Buy'))
// const IntroSection = lazy(async () => import('~mb/sections/Intro'))
// const SplashSection = lazy(async () => import('~mb/sections/Splash'))
// const PartnersSection = lazy(async () => import('~mb/sections/Partners'))
// const TeamSection = lazy(async () => import('~mb/sections/Team'))
// const ServicesSection = lazy(async () => import('~mb/sections/Services'))

import BuySection from "~mb/sections/Buy";
import IntroSection from "~mb/sections/Intro";
import PartnersSection from "~mb/sections/Partners";
import ServicesSection from "~mb/sections/Services";
import SplashSection from "~mb/sections/Splash";
import TeamSection from "~mb/sections/Team";


export function Home(): JSX.Element {
  const meta = {
    title: 'Welcome to the Metaverse',
    description:
      'We the Meta-Builders will help you navigate this new paradigm, and take your brand to new heights',
    previewImageSrc: new URL('social.png', imgixUrl)
  }

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
