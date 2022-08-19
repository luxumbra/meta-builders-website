import { Icon } from '@iconify/react'
import { v4 as uuid } from "uuid";

import services from "~mb/data/services/services.json";
import { useSectionAnimation } from '~mb/hooks/animation';
import { ContentSection } from "~mb/sections/index";

export function ServicesLead(): JSX.Element {
  return (
    <>
      We provide <span className="text-primary">end to end services</span> for curating <span className="text-primary">Web3</span> and <span className="text-primary">Metaverse </span> environments.
    </>
  )
}

export default function ServicesSection(): JSX.Element {
  const sectionId = 'services'

  return (
    <ContentSection title="Services" id={sectionId} lead={<ServicesLead />}>
      <ul className="grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon }) => (
          <li key={uuid()} className="flex flex-col items-center gap-4 p-6 border border-default bg-glass-secondary-200 dark:bg-glass-primary-900 backdrop-blur-2xl">
            <div className="w-16 h-16 p-3 border-2 border-teal-200 rounded-full inline-flex items-center justify-center text-shadow-alt-sm-teal">
              <Icon icon={icon} className="text-6xl text-teal-300 " />
            </div>
            <h3 className="text-xl font-extrabold text-center text-teal-300">{title}</h3>
            <p className="text-sm text-center text-offset">{description}</p>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
