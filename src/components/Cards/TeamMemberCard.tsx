import Imgix from 'react-imgix';

import { buildImgUrl } from '~mb/lib/helpers';
import type { ITeamMember } from '~mb/types';


export type TeamMember = ITeamMember

export function TeamMemberCard(properties: TeamMember): JSX.Element {
  const { image, name, role } = properties;
  const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
  const siteUrl = import.meta.env.VITE_SITE_URL as string;
  const avatar = new URL(image, `${siteUrl}/assets/team/images`);
  const avatarUrl = avatar.toString();
  const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';

  return (
    <div className="group">
      <figure className="flex flex-col space-y-3 items-center leadIn">
        <div className="avatar">
          <picture
            className={`rounded-full
        w-[150px]
        h-[150px]
        overflow-hidden`}
          >
            {!isDevelopment ? (
              <Imgix
                className="object-cover w-full h-full transition-all duration-300 bg-cover group-hover:scale-110 group-hover:opacity-20 group-focus:scale-110 group-focus:opacity-20"
                src={buildImgUrl(image, 'assets/team/images')}
                sizes={sizes}
                width={150}
                height={150}
                htmlAttributes={{
                  alt: `${name}'s avatar`
                }}
              />
            ) : (
              <img src={`/assets/team/images/${image}`} alt={`${name}'s avatar`} />
            )}
          </picture>
        </div>
        <figcaption className="text-center flex flex-col gap-0">
          <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 leadIn">{name}</h3>
          <p className="text-sm leadIn">{role}</p>
        </figcaption>
      </figure>
    </div>
  )
}
export default TeamMemberCard;