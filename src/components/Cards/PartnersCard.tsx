

import { useEffect, useState } from 'react';

import Imgix from 'react-imgix';

import { isDevelopment } from '~mb/lib/constants';
import { buildImgUrl } from '~mb/lib/helpers';
import type { IPartner } from '~mb/types';

export type PartnersCardProperties = IPartner

export function PartnersCard({ partner }: {partner: PartnersCardProperties}): JSX.Element {
  const { name, bio, image, url } = partner;
  const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  // eslint-disable-next-line unicorn/no-null
  const partnerImage = image !== '' ? image : 'missing-image.png';

  return (
    <a className="partners-card group aspect-video leadIn flex-shrink" href={url}>
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
          {!isDevelopment ? (
            <Imgix
              className="object-cover w-full h-full transition-all duration-300 bg-cover group-hover:scale-110 group-hover:opacity-20 group-focus:scale-110 group-focus:opacity-20"
              src={buildImgUrl(partnerImage, 'assets/partners/images')}
              width={300}
              htmlAttributes={{
                alt: `${name}'s logo`,
                sizes,
              }}
            />
          ) : (
            <img src={`/assets/partners/images/${partnerImage}`} alt={`${name}'s logo`} className=' object-contain w-auto h-full transition-all duration-300 bg-cover opacity-70 group-hover:scale-110 group-hover:opacity-50 group-focus:scale-110 group-focus:opacity-50 filter grayscale  shadow-teal-400' />
        )}

      </picture>
        <figcaption className="absolute -bottom-8 flex flex-col items-start text-left justify-center content-center min-w-full md:w-[125%] flex-grow min-h-[150%] h-auto gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-50 group-hover:scale-100 group-focus:scale-100 group-hover:-translate-y-0 group-focus:translate-y-1/2 translate-y-10 origin-center z-50  filter backdrop-blur-xl">
          <div className="relative bio-content flex flex-col gap-y-2 p-3 flex-grow z-10">
            <h4 className='text-md font-bold gradient-text'>{name}</h4>
            {bio ? <p className="text-xs text-white leading-tight ">{bio}</p> : undefined}

            <div className="inline-flex gap-2 flex-row items-center translate-y-5 transition-transform  group-hover:translate-y-0 -translate-x-6 group-hover:translate-x-0 scale-0 group-hover:scale-100">
              {url ? <a href={url} title={`${name}'s website`} className="text-xs text-white badge badge-link">Website</a> : undefined}
            </div>
          </div>
          <div className='absolute inset-0 bg-slate-900 dark:bg-slate-900 opacity-80 filter backdrop-blur-xl blur-md rounded-lg shadow-lg p-4 w-full h-full z-0'/>
        </figcaption>
    </figure>
    </a>
  )
}

export default PartnersCard;