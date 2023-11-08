

// import Imgix from 'react-imgix';

// import { isDevelopment } from '~mb/lib/constants';
// import { buildImgUrl } from '~mb/lib/helpers';
import type { IPartner } from '~mb/types';

export type PartnersCardProperties = IPartner

export function PartnersCard({ partner }: { partner: PartnersCardProperties }): JSX.Element {
  const { name, image, url } = partner;
  // const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
  // eslint-disable-next-line unicorn/no-null
  const partnerImage = image !== '' ? image : 'missing-image.png';

  return (
    <a
      className="partners-card group aspect-video leadIn flex-shrink"
      href={url !== '' ? url : '#'}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
    >
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
            <img src={`/assets/partners/images/${partnerImage}`} alt={`${name}'s logo`} className=' object-contain w-auto h-full transition-all duration-300 bg-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 group-focus:scale-110 group-focus:opacity-100 filter grayscale group-hover:grayscale-0 invert dark:invert-0 shadow-teal-400' loading="lazy" />

      </picture>
    </figure>
    </a>
  )
}

export default PartnersCard;