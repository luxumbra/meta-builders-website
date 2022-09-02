import { Icon } from "@iconify/react";
import { HashLink } from "react-router-hash-link";

import { ContentSection } from "~mb/sections/index";


export function MissionSectionLead(): JSX.Element {
  return (
    <div className="text-xs xl:text-sm 2xl:text-sm text-left mb-5">
    <p className="text-xl 2xl:text-xl mb-2 2xl:mb-3 text-center text-primary">
      The world as we know it is becoming more decentralized everyday with less and less central authority. </p>
    <p className="mb-2 2xl:mb-5">This phenomenon has spawned the next generation of human interaction which is Web3 (built on, integrated with, or enabled by blockchain technologies) and the Metaverse (a more immersive 3D form of the current collaborative applications and social software being used today, powered by Web3).</p>

      <p className="text-center">Join us as we <strong className="text-primary">empower each other</strong>, <strong className="text-primary">grow together</strong>, and <strong className="text-primary">make the world a better place</strong> to live in.</p>
      </div>
  )
}

export default function MissionSection(): JSX.Element {
  const sectionId = 'mission';

  return (
    <ContentSection
      title="Our Mission"
      id={sectionId}
      justify="center" lead={<MissionSectionLead />}>
      <div
        className="grid gap-5 grid-cols-2"
      >
        <HashLink
          to="#team"
          className="group flex items-center justify-center gap-3 px-3 2xl:px-6 py-2 2xl:py-4 border-2 border-violet-500 hover:border-teal-500 rounded-md"
        >
          <Icon
            icon="fa:group"
            className="text-5xl 2xl:text-6xl"
          />
          <span className="gradient-text-alt text-md md:text-2xl group-hover:text-teal-500 transition-colors">The Team</span>
        </HashLink>
        <HashLink
          to="#pricing"
          className="group flex items-center justify-center gap-3 px-3 2xl:px-6 py-2 2xl:py-4 border-2 border-violet-500 hover:border-teal-500 rounded-md"
        >
          <Icon
            icon="mdi:rocket"
            className="text-5xl 2xl:text-6xl"
          />
          <span className="gradient-text-alt text-md md:text-2xl group-hover:text-teal-500 transition-colors">Packages</span>
        </HashLink>
      </div>
    </ContentSection>
  )
}