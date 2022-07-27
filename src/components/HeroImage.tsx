import Imgix from 'react-imgix'

import { buildImgUrl } from '~mb/lib/helpers'

export function HeroImage(): JSX.Element {
  const widths = [450, 800, 1200]
  const sizes = '100vw'

  return (
    <picture>
      {/* {!isDevelopment ? (
        <Imgix
          className='h-full w-full object-cover'
          src={buildImgUrl('synthwave-outrun.jpg', 'assets/images')}
          width={1200}
          height={800}
          htmlAttributes={{
            alt: 'The ridged surface of the moon',
            sizes
          }}
        />

      ) : ( */}
          <img src="/assets/images/synthwave-outrun-1920.png" alt="The ridged surface of the moon" className='h-full w-full object-cover' />
      {/* )} */}
    </picture>
  )
}
