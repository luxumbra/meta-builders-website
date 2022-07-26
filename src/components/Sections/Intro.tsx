import { useLayoutEffect } from "react";

import { Icon } from "@iconify/react";

import { handleSectionAnimation } from '~mb/animation/functions'
import {ContentSection} from "~mb/sections/index";


export function IntroSectionLead(): JSX.Element {
  return (
    <>
      Our services help you navigate this
      <span className="text-primary text-shadow">new paradigm</span>,
      and take
      <span className="text-primary text-shadow">your brand</span>
      to new heights.
    </>
  )
}

export default function IntroSection(): JSX.Element {
  const sectionId = '#intro';

  useLayoutEffect (() => {
    handleSectionAnimation(sectionId);

    return () => {
      handleSectionAnimation(sectionId, true);
    }
  }, [])

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
          className="leadIn flex items-center justify-center gap-3 px-6 py-4 border-2 border-current"
        >
          <Icon
            icon="mdi:telescope"
            className="h-8"
          />
          <span>The Team</span>
        </a>
        <a
          href="#services"
          className="leadIn flex items-center justify-center gap-3 px-6 py-4 border-2 border-current"
        >
          <Icon
            icon="mdi:rocket"
            className="h-8"
          />
          <span>Services</span>
        </a>
      </div>
    </ContentSection>
  )
}