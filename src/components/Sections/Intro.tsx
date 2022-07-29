import { useEffect, useLayoutEffect } from "react";

import { Icon } from "@iconify/react";
import {useIsClient} from "usehooks-ts"

import { useSectionAnimation } from '~mb/hooks/animation'
import {ContentSection} from "~mb/sections/index";


export function IntroSectionLead(): JSX.Element {
  return (
    <>
      Our services help you navigate this <span className="text-primary text-shadow">new paradigm</span>,
      and take <span className="text-primary text-shadow">your brand</span> to new heights.
    </>
  )
}

export default function IntroSection(): JSX.Element {
  const sectionId = '#intro';
  useSectionAnimation(sectionId);

  return (
    <ContentSection
      title="The Metaverse"
      id="intro"
      justify="center" lead={<IntroSectionLead />}>
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        <a
          href="#team"
          className="leadIn group flex items-center justify-center gap-3 px-6 py-4 border-2 border-violet-500 hover:border-teal-500 rounded-md"
        >
          <Icon
            icon="fa:group"
            className="text-6xl"
          />
          <span className="gradient-text-alt text-2xl group-hover:text-teal-500 transition-colors">The Team</span>
        </a>
        <a
          href="#services"
          className="leadIn group flex items-center justify-center gap-3 px-6 py-4 border-2 border-violet-500 hover:border-teal-500  border-current rounded-md"
        >
          <Icon
            icon="mdi:rocket"
            className="text-6xl"
          />
          <span className="gradient-text-alt text-2xl group-hover:text-teal-500 transition-colors">Services</span>
        </a>
      </div>
    </ContentSection>
  )
}