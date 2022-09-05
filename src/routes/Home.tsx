import Layout from '~mb/layouts/Default'
import { imgixUrl } from '~mb/lib/constants'
import '~mb/styles/index.css'
import BuySection from '~mb/sections/Buy'
import MissionSection from "~mb/sections/Mission";
import PartnersSection from "~mb/sections/Partners";
import ServicesSection from "~mb/sections/Services";
import SplashSection from "~mb/sections/Splash";
import TeamSection from "~mb/sections/Team";



export function Home(): JSX.Element {
  const meta = {
    title: 'Home: Welcome to the Metaverse',
    description:
      'We the Meta-Builders will help you navigate this new paradigm, and take your brand to new heights',
    previewImageSrc: new URL('social.png', imgixUrl)
  }

  return (
    <Layout content={meta}>
      <SplashSection />
      <MissionSection />
      <ServicesSection />
      <PartnersSection />
      <TeamSection />
      <BuySection />
    </Layout>
  )
}

export default Home
