

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

  return (
    <a className="group aspect-video hover:!text-default leadIn" href={url}>
    <figure className="relative w-full h-full overflow-hidden">
      <picture>
        <Imgix
          className="object-cover w-full h-full transition-all duration-300 bg-cover group-hover:scale-110 group-hover:opacity-20 group-focus:scale-110 group-focus:opacity-20"
          src={buildImgUrl(image, 'assets/partners/images')}
          width={300}
          height={220}
          htmlAttributes={{
            alt: `A screenshot of ${url}`,
            sizes,
          }}
        />
      </picture>
      <figcaption className="absolute inset-0">
        <div
          className="flex flex-col items-center justify-center h-full gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100"
        >
          <h3 className="text-xl font-extrabold text-center uppercase">
            {name}
          </h3>
          <p className="px-4 py-2 border border-current">{url}</p>
        </div>
      </figcaption>
    </figure>
    </a>
  )
}

export default PartnersCard;