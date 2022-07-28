import { Icon } from '@iconify/react'
import { v4 as uuid } from "uuid";

import services from "~mb/data/services/services.json";
import { useSectionAnimation } from '~mb/hooks/animation';
import { ContentSection } from "~mb/sections/index";

export function ServicesLead(): JSX.Element {
  return (
    <>
      We provide end to end services for curating <span className="text-primary">Web3</span>
      and
      <span className="text-primary">Metaverse </span> environments.
    </>
  )
}

export default function ServicesSection(): JSX.Element {
  const section = 'services'
  useSectionAnimation(`#${section}`)

  return (
    <ContentSection title="Services" id={section} lead={<ServicesLead />}>
      <ul className="grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon }) => (
          <li key={uuid()} className="leadIn flex flex-col items-center gap-4 p-6 border border-default bg-offset">
            <div className="w-16 h-16 p-3 border-2 border-current rounded-full">
              <Icon icon={icon} />
            </div>
            <p className="text-xl font-extrabold text-center">{title}</p>
            <p className="text-sm text-center text-offset">{description}</p>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
