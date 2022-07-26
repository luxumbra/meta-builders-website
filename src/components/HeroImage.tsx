import Imgix from 'react-imgix'

import { buildImgUrl } from '~mb/lib/helpers'

export function HeroImage(): JSX.Element {
  const widths = [450, 800, 1200]
  const sizes = '100vw'

  return (
    <picture>
      <Imgix
        className='h-full w-full object-cover'
        src={buildImgUrl('/assets/images/moon.jpg')}
        width={1200}
        height={800}
        htmlAttributes={{
          alt: 'The ridged surface of the moon',
          sizes
        }}
      />
    </picture>
  )
}
