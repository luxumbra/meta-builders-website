import { useLayoutEffect } from "react";

import { v4 as uuid } from "uuid";

import { PartnersCard  } from  '~mb/cards/index';
import partners from "~mb/data/partners/partners.json";
import { useSectionAnimation } from "~mb/hooks/animation";
import {ContentSection} from "~mb/sections/index";



export function PartnerSectionLead(): JSX.Element {
  return (
    <>
      <span className="text-primary">Meta-Builders is a community</span> of developers and designers who are <span className="text-primary">passionate about building software</span>.
    </>
  )
}

export default function PartnersSection(): JSX.Element {
  const sectionId = '#partners';
  useSectionAnimation(sectionId);

  return (
    <ContentSection title="MB Partners" id="partners" lead={<PartnerSectionLead />}>
      <div className="max-w-6xl space-y-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {partners.map(({ name, image, url }) => <PartnersCard key={uuid()} name={name} image={image} url={url} />)}
        </div>
      </div>
    </ContentSection>
  )
}