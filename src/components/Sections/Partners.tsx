import { v4 as uuid } from "uuid";

import { PartnersCard  } from  '~mb/cards/index';
import partners from "~mb/data/partners/partners.json";
import {ContentSection} from "~mb/sections/index";



export function PartnerSectionLead(): JSX.Element {
  return (
    <>
      <span className="text-primary">Meta-Builders is a community</span> of developers and designers who are <span className="text-primary">passionate about building software</span>.
    </>
  )
}

export default function PartnersSection(): JSX.Element {
  const sectionId = 'partners';

  return (
    <ContentSection title="MB Partners" id={sectionId} lead={<PartnerSectionLead />}>
      <div className="max-w-3/4 w-full xl:max-w-4xl 2xl:max-w-6xl space-y-2">
        <div className="grid grid-cols-3 gap-2 xl:gap-4 xl:grid-cols-4 text-center">
          {partners.map((partner) => <PartnersCard key={uuid()} partner={partner} />)}
        </div>
      </div>
    </ContentSection>
  )
}