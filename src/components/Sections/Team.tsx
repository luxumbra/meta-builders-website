import { v4 as uuid } from "uuid";

import { Rain } from "../Rain";

import { TeamMemberCard } from '~mb/cards/index';
import members from "~mb/data/team/members.json";
import { useSectionAnimation } from '~mb/hooks/animation';
import {ContentSection} from "~mb/sections/index";
import { ITeamMember } from "~mb/types";

export function TeamSectionLead(): JSX.Element {
  return (
    <>
      We are the <span className="text-primary">Meta-Builders</span>! We have <span className="text-primary">everything you need</span> to keep <span className="text-primary">your content</span> afloat in this ever changing digital world
    </>
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