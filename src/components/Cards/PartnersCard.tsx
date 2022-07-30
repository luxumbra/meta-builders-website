

import { useEffect, useState } from 'react';

import Imgix from 'react-imgix';

import { buildImgUrl } from '~mb/lib/helpers';
import type { IPartner } from '~mb/types';

export type PartnersCardProperties = {
  name: IPartner['name'];
  image: IPartner['image'];
  url: IPartner['url'];
}

export function PartnersCard(properties: PartnersCardProperties): JSX.Element {
  const { name, image, url } = properties;
  const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  // eslint-disable-next-line unicorn/no-null

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
        {/* <Imgix
          className="object-cover w-full h-full transition-all duration-300 bg-cover group-hover:scale-110 group-hover:opacity-20 group-focus:scale-110 group-focus:opacity-20"
          src={buildImgUrl(image, 'assets/partners/images')}
          width={300}
          height={220}
          htmlAttributes={{
            alt: `A screenshot of ${url}`,
            sizes,
          }}
        /> */}
          <img src={image !== "undefined" ? image : 'src/static/assets/images/missing-image.png'} alt={`${name}'s logo`} className=' object-contain w-auto h-full transition-all duration-300 bg-cover opacity-70 group-hover:scale-110 group-hover:opacity-50 group-focus:scale-110 group-focus:opacity-50 filter grayscale  shadow-teal-400' />

      </picture>
      <figcaption className="absolute inset-0">
        <div
          className="hidden md:flex group flex-col items-center justify-center h-full gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100
           group-hover:translate-y-0 group-focus:translate-y-0 translate-y-3"
        >
          <h3 className="text-xl font-extrabold text-teal-400 text-center uppercase">
            {name}
          </h3>
          <p className="px-4 py-2 font-bold bg-violet-900 border rounded-md border-teal-400 border-current">{url}</p>
        </div>
      </figcaption>
    </figure>
    </a>
  )
}

export default PartnersCard;