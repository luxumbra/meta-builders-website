import { Icon } from "@iconify/react";

import { ContentSection } from "~mb/sections/index";


export function MissionSectionLead(): JSX.Element {
  return (
    <div className="text-sm text-left">
    <p className="text-xl mb-3 text-center text-primary">
      The world as we know it is becoming more decentralized everyday with less and less central authority. </p>
    <p className="mb-5">This phenomenon has spawned the next generation of human interaction which is Web3 (built on, integrated with, or enabled by blockchain technologies) and the Metaverse (a more immersive 3D form of the current collaborative applications and social software being used today, powered by Web3).</p>

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