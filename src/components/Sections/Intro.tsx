import { Icon } from "@iconify/react";

import { ContentSection } from "~mb/sections/index";


export function IntroSectionLead(): JSX.Element {
  return (
    <p>
      <span className="text-primary text-shadow">We are the Sherpas of the Web3 ecosystem.</span> <br />
        Our mission: to grow Web3 by making it easy for Web2 Brands to access the tools they need to compete in the new market.
    </p>
  )
}

export default function IntroSection(): JSX.Element {
  const sectionId = 'intro';

  return (
    <ContentSection
      title="The Metaverse"
      id={sectionId}
      justify="center" lead={<IntroSectionLead />}>
      <div
        className=" grid gap-2 grid-cols-2"
      >
        <a
          href="#team"
          className="group flex items-center justify-center gap-3 px-3 md:px-6 py-2 md:py-4 border-2 border-violet-500 hover:border-teal-500 rounded-md"
        >
          <Icon
            icon="fa:group"
            className="text-6xl"
          />
          <span className="gradient-text-alt text-md md:text-2xl group-hover:text-teal-500 transition-colors">The Team</span>
        </a>
        <a
          href="#services"
          className="group flex items-center justify-center gap-3 px-6 py-4 border-2 border-violet-500 hover:border-teal-500 rounded-md"
        >
          <Icon
            icon="mdi:rocket"
            className="text-6xl"
          />
          <span className="gradient-text-alt text-md md:text-2xl group-hover:text-teal-500 transition-colors">Packages</span>
        </a>
      </div>
    </ContentSection>
  )
}