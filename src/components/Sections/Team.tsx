import { v4 as uuid } from "uuid";

import { TeamMemberCard } from '~mb/cards/index';
import members from "~mb/data/team/members.json";
import {ContentSection} from "~mb/sections/index";

export function TeamSectionLead(): JSX.Element {
  return (
    <p>
      Join us in <a href="https://discord.gg/metabuilders" target="_blank" rel="noreferrer" className="text-violet-500 underline">our Discord</a>, we&apos;d love to meet you!
    </p>
  )
}

export default function TeamSection(): JSX.Element {
  const sectionId = 'team';

  return (
    <ContentSection title="Meet your team" id={sectionId} lead={<TeamSectionLead />} >
      <div className="max-w-4xl 2xl:max-w-6xl space-y-2">
        <div className="grid grid-cols-2 gap-3 2xl:gap-6 space-y-0 md:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <TeamMemberCard key={uuid()} member={member} />
          ))}
        </div>
      </div>
    </ContentSection>
  )
}