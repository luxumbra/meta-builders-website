import { CSSProperties } from 'react'

import Imgix from 'react-imgix'
import { useImageOnLoad, useMediaQuery } from 'usehooks-ts'

import { buildImgUrl } from '~mb/lib/helpers'

export function HeroImage(): JSX.Element {
  const { handleImageOnLoad, css } = useImageOnLoad()
  const widths = [450, 768, 1366, 1920]
  const sizes = '100vw'
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <picture className="relative inset-0 w-screen h-screen m-auto" >
      <Imgix
        className='h-screen w-screen object-cover'
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        width={isDesktop ? widths[3] : widths[1]}
        height={800}
        sizes={sizes}
        htmlAttributes={{
          alt: 'Synthwave landscape with a Metaverse city in the distance',
          loading: 'eager',
        }}
        imgixParams={{
          fit: "crop",
          fm: "png",
        }}
      />
      {/* <img
        className='absolute inset-0 h-full w-full object-cover'
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        alt='Thumb: The ridged surface of the moon'
        />
      <img
        className='absolute inset-0 h-full w-full object-cover'
        // eslint-disable-next-line react/jsx-handler-names
        onLoad={handleImageOnLoad}
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        alt='The ridged surface of the moon'
      /> */}
    </picture>
  )
}
