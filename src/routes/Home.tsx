import Layout from "~mb/layouts/Default";
import { imgixUrl } from "~mb/lib/constants";
import { BuySection, IntroSection, SplashSection, PartnersSection, TeamSection, ServicesSection } from '~mb/sections/index';
import "~mb/styles/index.css";

const previewImgUrl = new URL("social.png", imgixUrl);
const meta = {
  title: "Welcome to the Metaverse",
  description: "Welcome to the Metaverse. Our Services Help You Navigate this New Paradigm, and Take Your Brand to New Heights",
  permaLink: "",
  previewImageSrc: new URL("social.png", imgixUrl)
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

export default Home;