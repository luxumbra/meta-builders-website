import Imgix from 'react-imgix';

import { isDevelopment } from '~mb/lib/constants';
import { buildImgUrl } from '~mb/lib/helpers';
import type { ITeamMember } from '~mb/types';


export type TeamMember = ITeamMember

export function TeamMemberCard({ member }: { member: TeamMember }): JSX.Element {
  const { image, name, role, bio, twitter, linkedin, email } = member;
  const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  // const siteUrl = import.meta.env.VITE_SITE_URL as string;
  // const avatar = new URL(image ?? 'missing-image.png', `${siteUrl}/assets/team/images`);
  const avatar = image !== '' ? image : 'missing-image.png';
  const shouldCenter = !!(bio && bio.length <= 50);

  return (
    <div className="group relative hover:cursor-pointer pt-0">
      <figure className="flex flex-col space-y-3 items-center text-center ">
        <div className="
            avatar
            flex
            flex-row
            items-center
            justify-center">
          <picture
            className={`
            relative
            rounded-full
            w-3/4
            lg:w-1/2
            h-auto
            lg:h-auto
            overflow-hidden box-shadow-[0_0_10px_5px_rgba(0,0,0,0.8)_inset] text-center
          `}
          >
            {/* {!isDevelopment ? (
              <Imgix
                className="object-cover w-full h-full transition-all duration-300 opacity-50 bg-cover group-hover:scale-110 group-hover:opacity-100 group-focus:scale-110 group-focus:opacity-100"
                src={buildImgUrl(image, 'assets/team/images')}
                sizes={sizes}
                htmlAttributes={{
                  alt: `${name}'s avatar`,
                  loading: 'lazy',
                }}
              />
            ) : ( */}
              <img src={`/assets/team/images/${avatar}`} alt={`${name}'s avatar`} className="object-cover w-full h-full transition-all duration-200 bg-cover group-hover:scale-110 group-hover:blur-0 group-focus:scale-110 group-focus:hue-rotate-0 self-center" loading='lazy' />
            {/* )} */}
          </picture>
        </div>
        <figcaption className="text-center flex flex-col gap-0">
          <h3 className="text-sm 2xl:text-lg font-bold 2xl:font-normal text-slate-600 dark:text-slate-400 leadIn">{name}</h3>
          <p className="text-xs 2xl:text-sm ">{role}</p>
        </figcaption>
        <div className="absolute rounded-lg bottom-0 flex flex-col items-start text-left justify-start content-center min-w-full md:w-[135%] flex-grow min-h-[120%] h-auto gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-50 group-hover:scale-100 group-focus:scale-100 group-hover:-translate-y-[0%] group-focus:translate-y-0 translate-y-10 origin-center z-50  filter backdrop-blur-xl ">
          <div className="relative bio-content flex flex-col gap-y-2 p-3 flex-grow-0 z-10 w-full">
            <h4 className="text-lg font-bold gradient-text tracking-normal text-center">{name}</h4>
            {bio ? <p className={`text-xs text-slate-500 dark:text-white leading-tight ${shouldCenter ? 'text-center' : 'text-left'}  `}>{bio}</p> : undefined}

            <div className="flex gap-2 flex-row justify-self-end items-center flex-shrink-0 translate-y-5 transition-transform  group-hover:translate-y-0 -translate-x-6 group-hover:translate-x-0 scale-0 group-hover:scale-100">
              {twitter ? <a href={twitter} title={`${name} on Twitter`} className="text-xs text-violet-700 dark:text-white badge badge-link">Twitter</a> : undefined}
              {linkedin ? <a href={linkedin} title={`${name} on Twitter`} className="text-xs text-violet-700 dark:text-white badge badge-link">LinkedIn</a> : undefined}
              {email ? <a href={email} title={`${name} on Email`} className="text-xs text-violet-700 dark:text-white badge badge-link">Email</a> : undefined}
            </div>
          </div>
          <div className='absolute inset-0  bg-slate-100 dark:bg-slate-900 opacity-80 filter backdrop-blur-xl rounded-lg shadow-lg p-4 w-full h-full z-0'/>
        </div>
      </figure>
    </div>
  )
}
export default TeamMemberCard;

/** TODO: Make this into a component to share between partners & team cards. */
// export type CardInfoPopOverProps = {
//   name: string;
//   bio?: string;
//   role?: string;
//   twitter?: string;
//   linkedin?: string;
//   email?: string;
//   url?: string;
// }

// export function CardInfoPopOver(props: CardInfoPopOverProps): JSX.Element {

//   return (
//     <div className="absolute bottom-0 flex flex-col items-start text-left justify-center content-center min-w-full md:w-[125%] flex-grow min-h-[120%] h-auto gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-50 group-hover:scale-100 group-focus:scale-100 group-hover:-translate-y-[0%] group-focus:translate-y-0 translate-y-10 origin-center z-50  filter backdrop-blur-xl">
//     <div className="relative bio-content flex flex-col gap-y-2 p-3 flex-grow z-10">
//       <h4 className='text-md font-bold gradient-text'>{name}</h4>
//       {bio ? <p className="text-xs text-white leading-tight ">{bio}</p> : undefined}

//       <div className="inline-flex gap-2 flex-row items-center translate-y-5 transition-transform  group-hover:translate-y-0 -translate-x-6 group-hover:translate-x-0 scale-0 group-hover:scale-100">
//         {twitter ? <a href={twitter} title={`${name} on Twitter`} className="text-xs text-white badge badge-link">Twitter</a> : undefined}
//         {linkedin ? <a href={linkedin} title={`${name} on Twitter`} className="text-xs text-white badge badge-link">LinkedIn</a> : undefined}
//         {email ? <a href={email} title={`${name} on Email`} className="text-xs text-white badge badge-link">Email</a> : undefined}
//       </div>
//     </div>
//     <div className='absolute inset-0 bg-slate-900 dark:bg-slate-900 opacity-80 filter backdrop-blur-xl blur-md rounded-lg shadow-lg p-4 w-full h-full z-0'/>
//   </div>
//   )
// }