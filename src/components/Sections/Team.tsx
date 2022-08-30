import { v4 as uuid } from "uuid";

import { TeamMemberCard } from '~mb/cards/index';
import members from "~mb/data/team/members.json";
import {ContentSection} from "~mb/sections/index";

export function TeamSectionLead(): JSX.Element {
  return (
    <p>
      The <span className="gradient-text">Meta-Builders</span> have <span className="text-primary">EVERYTHING you need to bring your Web2 Brand into Web3</span>. We can help you <span className="text-primary">build trustless, transparent architecture</span> to take your brand into the future - thanks to the talents of this group.
    </p>
  )
}

export default function TeamSection(): JSX.Element {
  const sectionId = 'team';

  return (
    <ContentSection title="Meet your team" id={sectionId} lead={<TeamSectionLead />}>
      <div className="max-w-6xl space-y-2">
        <div className="grid grid-cols-2 gap-6 space-y-0 md:gap-5 md:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <TeamMemberCard key={uuid()} member={member} />
          ))}
        </div>
      </div>
    </ContentSection>
  )
}