

// import Imgix from 'react-imgix';

// import { isDevelopment } from '~mb/lib/constants';
// import { buildImgUrl } from '~mb/lib/helpers';
import type { IPartner } from '~mb/types';

export type PartnersCardProperties = IPartner

export function PartnersCard({ partner }: {partner: PartnersCardProperties}): JSX.Element {
  const { name, image } = partner;
  // const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  // eslint-disable-next-line unicorn/no-null
  const partnerImage = image !== '' ? image : 'missing-image.png';

  return (
    <div className="partners-card group aspect-video leadIn flex-shrink" title={name}>
    <figure className="relative w-full h-full items-center text-center flex flex-row content-center justify-center">
        <picture
          className={`
          relative
          w-auto
          lg:w-auto
          h-3/4
          lg:h-full
        `}
        >
            <img src={`/assets/partners/images/${partnerImage}`} alt={`${name}'s logo`} className=' object-contain w-auto h-full transition-all duration-300 bg-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 group-focus:scale-110 group-focus:opacity-100 filter grayscale invert dark:invert-0 shadow-teal-400' loading="lazy" />

      </picture>
        {/* <figcaption className="absolute rounded-lg -bottom-8 flex flex-col items-start text-left justify-center content-center min-w-full md:w-[125%] flex-grow min-h-[150%] h-auto gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-50 group-hover:scale-100 group-focus:scale-100 group-hover:-translate-y-0 group-focus:translate-y-1/2 translate-y-10 origin-center z-[70]  filter backdrop-blur-xl">
          <div className="relative bio-content flex flex-col space-y-2 p-3 flex-grow z-10">
            <h4 className='text-lg font-bold gradient-text tracking-normal leading-none mb-0 '>{name}</h4>
            {bio ? <p className="text-xs text-slate-500 dark:text-white leading-tight ">{bio}</p> : undefined}
          </div>
          <div className='absolute inset-0 bg-slate-200 dark:bg-slate-900 opacity-80 filter backdrop-blur-xl  rounded-lg shadow-lg p-4 w-full h-full z-0'/>
        </figcaption> */}
    </figure>
    </div>
  )
}

export default PartnersCard;